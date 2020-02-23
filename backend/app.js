const http = require('http');
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const redisStorage = require('./src/db/redis');

const {access} = require('./src/utilities/log');

// const SESSION_DATA = {};

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 60 * 1000);
    return d.toGMTString();
}

const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', chunk => {
            if (!postData) {
                resolve({})
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    access(`${req.method}-${req.url}-${req.headers['user-agent']}-${Date.now()}`);
    res.setHeader('Content-type', 'application/json');

    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);

    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        req.cookie[arr[0].trim()] = arr[1].trim();
    });
    console.log('cookie is', req.cookie);

    // 解析session
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
    }
    redisStorage.get(userId)
    .then(val => {
        if (!val) {
            redisStorage.set(userId, {});
            req.session = {};
            return;
        }
        req.session = val;
    })
    // .catch(err => {
    //     console.log('err', err)
    // })
    // if (!SESSION_DATA[userId]) {
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];
    .then(() => {
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData;
        console.log('app.js session: ',req.session);
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData));
            })
            return;
        }

        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData));
            })
            return;
        }

        res.writeHead(404, {
            "Content-type": "text/plain"
        });
        res.write('404 Not Found \n');
        res.end();
    })


}

module.exports = serverHandle;
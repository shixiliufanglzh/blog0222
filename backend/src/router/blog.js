const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
    if (!req.session.userName) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;

    // res.setHeader('Content-type', 'application/json');
    if (method === 'GET' && req.path === '/api/blog/list') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        return getList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return getDetail(req.query.id).then(data => {
            console.log(data)
            return new SuccessModel(data);
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        req.body.author = req.session.userName;
        return newBlog(req.body).then(data => {
            return new SuccessModel(data);
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        req.body.author = req.session.userName;
        return updateBlog(req.query.id, req.body).then(result => {
            if (result) {
                return new SuccessModel();
            } else {
                return new ErrorModel('博客保存失败');
            }
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        req.body.author = req.session.userName;
        return deleteBlog(req.query.id, author).then(result => {
            if (result) {
                return new SuccessModel();
            } else {
                return new ErrorModel('博客删除失败');
            }
        })
    }
}

module.exports = handleBlogRouter;
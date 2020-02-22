const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const redisStorage = require('../db/redis');
const handleUserRouter = (req, res) => {
    const method = req.method;

    // res.setHeader('Content-type', 'application/json');
    if (method === 'GET' && req.path === '/api/user/login') {
        const {userName, password} = req.query;
    // if (method === 'POST' && req.path === '/api/user/login') {
    //     const {userName, password} = req.body;
        return login(userName, password).then(result => {
            if (result) {
                req.session.userName = result.userName;
                req.session.realName = result.realName;
                redisStorage.set(req.cookie.userId, result);
                return new SuccessModel(result);
            } else {
                return new ErrorModel('登录失败');
            }
        })
    }
}

module.exports = handleUserRouter;

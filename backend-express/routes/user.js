var express = require('express');
var router = express.Router();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET blogs listing. */
router.post('/login', function (req, res, next) {
    const {
        userName,
        password
    } = req.body;
    return login(userName, password).then(result => {
        if (result) {
            req.session.userName = result.userName;
            req.session.realName = result.realName;
            // redisStorage.set(req.cookie.userId, result); //removed, caz session will be synchronized to redis automatically
            res.json(new SuccessModel(result));
        } else {
            res.json(new ErrorModel('登录失败'));
        }
    })
});

module.exports = router;

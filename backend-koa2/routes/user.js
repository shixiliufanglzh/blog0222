const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {
        userName,
        password
    } = ctx.request.body;
    const result = await login(userName, password)
    if (result) {
        ctx.session.userName = result.userName;
        ctx.session.realName = result.realName;
        ctx.body = new SuccessModel(result)
    } else {
        ctx.body = new ErrorModel('登录失败')
    }
})

module.exports = router

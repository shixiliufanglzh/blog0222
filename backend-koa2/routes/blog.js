const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleWare/loginCheck')

router.prefix('/api/blog')

router.get('/list', loginCheck, async function (ctx, next) {
    ctx.body = 'this is a users response!'

    const author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

module.exports = router

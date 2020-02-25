var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

// const loginCheck = (req) => {
//     if (!req.session.userName) {
//         return Promise.resolve(new ErrorModel('尚未登录'));
//     }
// }

/* GET blogs listing. */
router.get('/list', function (req, res, next) {
    // const loginCheckResult = loginCheck(req);
    // if (loginCheckResult) {
    //     return loginCheckResult;
    // }
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    return getList(author, keyword).then(listData => {
        res.json(new SuccessModel(listData))
    })
});

module.exports = router;

const express = require('express')
const wenzhangContr = require('../controller/wenzhangContr.js')
const router = express.Router()

router.get('/post-add', wenzhangContr.postadd) // 处理写文章的路由
    .post('/postsave', wenzhangContr.postsave) // 处理新增文章的路由
    .get('/posts', wenzhangContr.posts) // 得到所有文章页面
    .get('/getPostData', wenzhangContr.getPostData) // 得到文章数据

module.exports = router
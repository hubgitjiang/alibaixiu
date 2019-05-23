const express = require('express')
const wenzhangContr = require('../controller/wenzhangContr.js')
const router = express.Router()

router.get('/post-add', wenzhangContr.postadd) // 处理写文章的路由
    .post('/postsave', wenzhangContr.postsave) // 处理新增文章的路由
    .get('/posts', wenzhangContr.posts) // 得到所有文章页面
    .get('/getPostData', wenzhangContr.getPostData) // 得到文章数据
    .get('/post-edit', wenzhangContr.post_edit ) // 得到编辑文章静态文件
    .get('/getPostById', wenzhangContr.getPostById ) // 根据 id 得到文章数据
    .post('/updatePost', wenzhangContr.updatePost) // 修改文章参数

module.exports = router
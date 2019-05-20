// 负责所有的与登录相关的路由
const express = require('express')
const loginContr = require('../controller/loginContr.js')
const router = express.Router()


router.get('/login', loginContr.getLogin)// 添加一个得到登录页面的路由
    .post('/loginPostData', loginContr.loginPostData) // 添加一个提交登录数据的路由
    .get('/logout', loginContr.logout) // 添加一个退出登录的路由

module.exports = router
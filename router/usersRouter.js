// 处理所有与 用户相关的路由
const express = require('express')
const userContr = require('../controller/usersContr.js')
const router = express.Router()

// 得到静态页面
router.get('/users', (req, res) => {
    userContr.getUsers(req, res)
})

// 暴露接口
module.exports = router
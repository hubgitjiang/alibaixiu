// 处理所有与 ||| 用户 ||| 相关的路由
const express = require('express')
const userContr = require('../controller/usersContr.js')
const router = express.Router()

router.get('/users', userContr.getUsers)    // 得到静态页面
    .post('/addUser', userContr.addUser)  // 添加用户的路由
    .get('/getAllUsers', userContr.getAllUsers) // 添加获取所有用户信息的路由
    .get('/delUser', userContr.delUser)   // 添加一个删除数据的路由
    .get('/getUserById', userContr.getUserById)   // 添加一个根据id得到用户的路由
    .post('/updateUser', userContr.updateUser)  // 添加一个修改用户的路由
    .post('/delUsersByIds', userContr.delUsersByIds)  // 添加一个批量删除的路由

// 暴露接口
module.exports = router
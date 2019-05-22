// 处理所有与 ||| 用户 ||| 相关的路由
const express = require('express')
const userContr = require('../controller/usersContr.js')
const router = express.Router()

// router.use((req, res, next) => {
//     // 验证是否登录
//     if (req.session.user) {
//         next()
//     } else {
//         res.send('<script>alert("您还没有登录");window.location="/login"</script>')
//     }
// })

router.get('/users', userContr.getUsers)    // 得到静态页面
    .post('/addUser', userContr.addUser)  // 添加用户的路由
    .get('/getAllUsers', userContr.getAllUsers) // 添加获取所有用户信息的路由
    .get('/delUser', userContr.delUser)   // 添加一个删除数据的路由
    .get('/getUserById', userContr.getUserById)   // 添加一个根据id得到用户的路由
    .post('/updateUser', userContr.updateUser)  // 添加一个修改用户的路由
    .post('/delUsersByIds', userContr.delUsersByIds)  // 添加一个批量删除的路由
    .get('/profile', userContr.profile) // 添加一个响应个人中心的路由
    .post('/updateProfile', userContr.updateProfile) // 添加一个修改个人信息的路由
    .get('/password-reset', userContr.password_reset) // 添加一个得到修改密码页面的路由
    .post('/updatepwd', userContr.updatepwd) // 添加一个处理修改密码的路由

// 暴露接口
module.exports = router
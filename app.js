// 职责：开启服务器
// 1.0 引入 express
// 2.0 搭建服务器
// 3.0 处理静态文件
// 4.0 处理路由文件
const express = require('express')
const cookieSession = require('cookie-session')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const usersRouter = require('./router/usersRouter.js')
const categoryRouter = require('./router/categoryRouter.js')
const loginRouter = require('./router/loginRouter.js')
const wenzhangRouter = require('./router/wenzhangRouter.js')
const setRouter = require('./router/setRouter.js')

const app = express()

// 配置 ejs 模板引擎
app.set('views', './views') // 设置模板引擎的静态页面
app.set('view engine', 'ejs') // 设置渲染模板使用的引擎

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置 session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

// 配置静态文件
app.use('/assets', express.static('./assets'))
app.use('/static/uploads', express.static('./uploads'))
app.use('/public', express.static('./public'))

// 注册路由中间件
app.use(loginRouter)    // 与 登录 相关的路由
app.use(usersRouter) // 与 用户 相关的路由
app.use(categoryRouter) // 与 分类 相关的路由
app.use(wenzhangRouter) // 与 文章 相关的路由
app.use(setRouter) // 与 设置 相关的路由

app.listen(3000, () => {
    console.log('服务器已经开启：localhost:3000/')
})
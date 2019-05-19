// 处理所有与分类路由相关的请求
const express = require('express')
const categoryContr = require('../controller/categoryContr.js')
const router = express.Router()

router.get('/categories', categoryContr.categories) // 添加一个 categories 路由
    .get('/getAllData', categoryContr.getAllData) // 添加一个 获取所有参数 的路由
    .post('/addCate', categoryContr.addCate) // 添加一个新增数据的路由
    .post('/delAllCateByIds', categoryContr.delAllCateByIds) // 添加一个批量删除路由

// 暴露接收
module.exports = router
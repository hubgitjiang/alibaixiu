// 引入 userdb
const userdb = require('../model/userdb.js')

// 处理所有与 用户 相关的逻辑
exports.getUsers = (req, res) => {
    // 将所有的用户数据查询出来
    userdb.query('SELECT * FROM users', result => {
        // 渲染页面, 渲染数据
        res.render('users', { result: result })
    })

}
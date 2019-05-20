// 处理所有与登录相关的操作
const db = require('./db.js')
module.exports = {
    query: db.query,
    // 根据邮箱验证密码
    getPwdByEmail: (email, callback) => {
        // 接收 sql 语句
        let sql = `SELECT password, nickname, id, avatar FROM users WHERE email = '${email}'`
        // 执行 sql 语句
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}
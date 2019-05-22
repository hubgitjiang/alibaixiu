const db = require('./db.js')
module.exports = {
    query: db.query,
    // 添加一个方法：根据 id 得到 user
    getUserById: (id, callback) => {
        // 接收 sql 语句
        let selSql = `SElECT * FROM users WHERE id = ${id}`
        // 执行 sql
        db.query(selSql, (err, result) => {
            callback(err, result)
        })
    },
    // 更新个人信息
    // 修改 别名 昵称 图片 说明
    updateMsgById: (obj, callback) => {
        // 拼接 sql 语句
        let updateSql = `UPDATE users SET slug = '${obj.slug}', nickname = '${obj.nickname}', avatar = '${obj.img}', bio = '${obj.bio}' WHERE id = ${obj.id}`
        // 执行 sql 语句
        db.query(updateSql, (err, result) => {
            callback(err, result)
        })
    },
    // 根据 id 得到密码
    getPwdById: (id, callback) => {
        // 接收 sql
        let sql = `SELECT password FROM users WHERE id = ${id}`
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    // 将密码更新到数据库
    updateUsersPwd: (id, newpwd, callback) => {
        let sql = `UPDATE users SET password = '${newpwd}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}

// -------------------------封装 db.js 之前的代码----------------------------
// // 执行所有与用户表相关的数据库操作
// const mysql = require('mysql')

// module.exports.query = (sql, callback) => {
//     // 创建一个连接对象
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'baixiu'
//     })
//     // 用户链接
//     connection.connect()
//     // 执行 sql 语句
//     connection.query(sql, (err, result) => {
//         if (err) {
//             return console.log(err.message)
//         }
//         // 执行成回调函数
//         callback(result)
//     })
//     // 关闭连接
//     connection.end()
// }
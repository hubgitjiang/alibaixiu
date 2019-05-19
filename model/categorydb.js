// 封装了 db.js 之后的代码
// 用来封装所有操作数据库的代码
const db = require('./db.js')
module.exports = {
    query: db.query,
    // 用来获取所有的数据分类
    selectAll: function(callback) {
        // 接收 sql 语句
        let selSql = `SELECT * FROM categories`
        // 执行 sql 语句
        db.query(selSql, (err, result) => {
            callback(err, result)
            // if (err) {
            //     return callback(err, null)
            // } 
            // callback(null, result)
        })
    },
    // 根据接收到的数据插入一条数据到 mysql
    // obj: 包括将来要插入到数据库中的别名和name
    addData: function(obj, callback) {
        // 接收 sql 语句
        let insertSql = `INSERT INTO categories (slug, name) VALUES ('${obj.slug}', '${obj.name}')`
        // 执行 
        db.query(insertSql, (err, result) => {
            callback(err, result)
        })
    },
    // 批量删除
    //  1.0 批量删除的 id 的字符串
    //  2.0 回调函数
    delCateByIds: function(ids, callback) {
        // 接收 sql 语句
        let sql = `DELETE FROM categories WHERE id in (${ids})`
        console.log(sql)
        // 执行 sql 代码
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}

// --------------------------------没有封装 db.js 之前的代码---------------------------------
// // 执行 分类 表的 db 文件
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
//             // 问题：查询数据库出错后，不应该自己将问题进行输出，应该将问返回给控制器，由控制器来决定问题应该如何解决
//             // 原则：将错误交给控制器：
//             // 原则：将错误信息与成功结果分开（给回调函数两个参数：第一个参数表示错误，第二个参数表示成功）
//             return callback(err, null) // 将错误信息交给了回调函数
//         }
//         // 执行成回调函数
//         callback(null, result)
//     })
//     // 关闭连接
//     connection.end()
// }
// 连接数据库

// 执行 分类 表的 db 文件
// 执行所有与用户表相关的数据库操作
const mysql = require('mysql')

module.exports.query = (sql, callback) => {
    // 创建一个连接对象
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'baixiu',
        multipleStatements: true // 允许 mysql 执行多条 sql 语句
    })
    // 用户链接
    connection.connect()
    // 执行 sql 语句
    connection.query(sql, (err, result) => {
        if (err) {
            // 问题：查询数据库出错后，不应该自己将问题进行输出，应该将问返回给控制器，由控制器来决定问题应该如何解决
            // 原则：将错误交给控制器：
            // 原则：将错误信息与成功结果分开（给回调函数两个参数：第一个参数表示错误，第二个参数表示成功）
            return callback(err, null) // 将错误信息交给了回调函数
        }
        // 执行成回调函数
        callback(null, result)
    })
    // 关闭连接
    connection.end()
}
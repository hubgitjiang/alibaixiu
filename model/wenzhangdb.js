// 引用 db
const db = require('./db.js')

module.exports = {
    query: db.query,
    // 新增文章数据
    addpost: (obj, callback) => {
        // 拼接 sql 语句
        let sql = `INSERT INTO posts (slug, title, feature, created, content, status, user_id, category_id) VALUES ('${obj.slug}', '${obj.title}', '${obj.feature}', '${obj.created}', '${obj.content}', '${obj.status}', ${obj.user_id}, ${obj.category_id})`
        // 执行 sql 语句
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    // 得到文章数据
    getPostsData: (callback) => {
        // 拼接 sql
        let sql = `SELECT * FROM posts`
        // 执行 sql
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}
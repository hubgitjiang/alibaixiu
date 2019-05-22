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
    //   查询数据库
    getPostsData: (page, pagesize, callback) => {
        // 拼接 sql
        // SELECT * FROM posts LIMIT 0,3 
        // SELECT * FROM posts LIMIT 3,3 
        // SELECT * FROM posts LIMIT 6,3 
        let sql = `SELECT posts.*,users.nickname, categories.name  FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN categories ON posts.category_id = categories.id ORDER BY posts.id desc LIMIT ${(page - 1) * pagesize}, ${pagesize};
                SELECT count(*) FROM posts`
        console.log(sql)
        // 执行 sql
        db.query(sql, (err, result) => {
            // 由于现在执行了两条 sql 语句：得到的结果也是两个数组 
            // [
            //     // 第一条 sql 语句执行完成后的结果
            //     [
            //         {id: 1, xx: xx},
            //         {id: 2, xx: xx},
            //         {id: 3, xx: xx}
            //     ],
            //     // 第二条 sql 语句执行完成的后的结果
            //     [
            //         { count(*): 8 }
            //     ]
            // ]
            callback(err, result)
            // console.log(result)
        })
    }
}
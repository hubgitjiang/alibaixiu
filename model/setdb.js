// 引入 db
const db = require('./db.js')

module.exports = {
    query: db.query,
    // 得到所有的导航菜单数据
    getAllMenuData: (callback) => {
        // 拼接 sql 语句
        let sql = `SELECT * FROM options WHERE options.key = 'nav_menus'`
        // 执行 sql 语句
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    // 添加导航菜单
    addMenus: function (params, callback) {
        // 得到之前的导航菜单数据
        this.getAllMenuData((err, result) => {
            if (err) {
                // 验证错误
                return callback(err, null)
            }
            // 将数据库中的数据转为对象
            let dataArr = JSON.parse(result[0].value)
            // 添加一个对象，创建一个新的对象
            let obj = {
                icon: 'fa fa-phone',
                text: params.text,
                title: params.title,
                link: params.href
            }
            // 添加对象到数据源中
            dataArr.push(obj)
            // 将对象转为字符串
            let dataStr = JSON.stringify(dataArr)
            // 更新到数据库中
            // 拼接 sql 语句
            let sql = `UPDATE options SET options.value='${dataStr}' WHERE options.key='nav_menus'`
            // 执行
            db.query(sql, (err, result) => {
                callback(err, result)
            })
        })
        // 拼接 sql 语句
    }
}
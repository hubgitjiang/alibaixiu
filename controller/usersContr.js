// 引入 userdb
const userdb = require('../model/userdb.js')

// 处理所有与 用户 相关的逻辑
module.exports = {
    // 得到所有的用户信息,并渲染页面
    getUsers: (req, res) => { // 在服务器中通过 ejs 结合 mysql 提供的数据进行的渲染
        if (isBroLogin(req, res)) {
            return
        }
        // 将所有的用户数据查询出来
        userdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return res.send('<script>alert("' + err.message + '")</script>')
            }
            // 渲染页面, 渲染数据
            // 还要将昵称也渲染到页面上
            let nickname = req.session.user.nickname
            res.render('users', { result: result, nickname: nickname })
        })
    },
    // 添加用户数据
    addUser: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }

        // 1.0 接收用户参数：
        var params = req.body
        // req.body
        // 2.0 将数据提交到数据库
        let addSql = `INSERT INTO users (slug, email, password, nickname, status) VALUES ('${params.slug}','${params.email}','${params.password}','${params.nickname}','activated')`
        // 3.0 执行 sql 语句
        userdb.query(addSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增用户失败'
                })
            }
            res.send({
                status: 200,
                msg: '新增用户成功'
            })
        })
    },
    // 动态获取所有用户信息
    getAllUsers: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }
        // 1.0 去数据库中得到所有数据
        let selSql = `SELECT * FROM users`
        // 2.0 将结果响应回浏览器
        userdb.query(selSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '数据获取失败'
                })
            }
            res.send({
                data: result,
                status: 200,
                msg: '数据获取成功'
            })
        })
    },
    // 根据用户 id 删除用户
    delUser: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }
        // 接收 id
        let id = req.query.id
        // 执行 sql
        let delSql = `DELETE FROM users WHERE id = ${id}`
        userdb.query(delSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除不成功'
                })
            }
            res.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },
    // 根据用户 id 得到用户对象
    getUserById: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }
        // 1.0 接收id
        let id = req.query.id
        // 2.0 根据id查询数据
        let selSql = `SELECT * FROM users WHERE id = ${id}`
        userdb.query(selSql, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '查询失败'
                })
            }
            // console.log(result[0])
            res.send({
                status: 200,
                msg: '查询成功',
                data: result[0]
            })
        })
    },
    // 修改用户
    updateUser: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }
        // 接收参数
        var params = req.body
        // 修改数据到 mysql
        let updateSql = `UPDATE users SET email='${params.email}', nickname='${params.nickname}', password='${params.password}' WHERE id=${params.id}`
        userdb.query(updateSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '修改失败'
                })
            }
            res.send({
                status: 200,
                msg: '修改成功'
            })
        })
    },
    // 批量删除
    delUsersByIds: (req, res) => {
        if(isXhrLogin(req, res)) {
            return
        }
        // 获取 参数 id
        let ids = req.body.id // {id: [1,2,3]}
        // 将数组转为字符串，用逗号隔开
        var idStr = ids.join(',')
        // 执行 sql 语句：
        let delSql = `DELETE FROM users WHERE id in (${idStr})`
        userdb.query(delSql, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '删除失败'
                })
            }
            res.send({
                status: 200,
                msg: '删除成功'
            })
        })
    }
}

// 验证是否验证：
function isXhrLogin(req, res) {
    if (!req.session.user) {
        res.send({
            status: 304,
            msg: '还没有登录'
        })
        return true
    } 
    return false
}
function isBroLogin(req, res) {
    if (!req.session.user) {
        return res.send('<script>alert("还没有登录");window.location="/login"</script>')
    }
}
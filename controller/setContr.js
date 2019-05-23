const setdb = require('../model/setdb.js')

module.exports = {
    // 得到菜单导航的静态页面
    nav_menus: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        // 渲染页面
        res.render('nav-menus', { nickname, avatar })
    },
    // 得到菜单导航的数据
    getMenuList: (req, res) => {
        // 执行 sql 语句，将数据查询出来
        setdb.getAllMenuData((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '成功',
                data: result
            })
        })
    },
    // 新增导航菜单
    addMenus: (req, res) => {
        // 接收参数
        let params = req.body
        // 操作 mysql
        setdb.addMenus(params, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '添加成功'
            })
        })
    }
}
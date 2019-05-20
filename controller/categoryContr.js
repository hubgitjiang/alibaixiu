const categorydb = require('../model/categorydb.js')
module.exports = {
    // 直接返回 categories 页面
    categories: (req, res) => {
        // 传入一个 nickname
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('categories', { nickname, avatar })
    },
    // 得到所有的分类数据
    getAllData: (req, res) => {
        // 直接调用封装好的方法：
        categorydb.selectAll((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '数据异常'
                })
            }
            res.send({
                status: 200,
                msg: '数据获取成功',
                data: result
            })
        })
        // 这段代码不合理：因为作为控制器，它不应该直接请求数据库，应该由 model 中的 xxxdb.js 文件来请，控制器只负责执行方法就行了
        // // 执行sql
        // let selSql = `SELECT * FROM categories`
        // // 如果执行查询数据时出错了，也应该将错误信息返回给浏览器
        // categorydb.query(selSql, (err, result) => {
        //     // 如果 err 存在说明，出错误了，返回出错信息
        //     if (err) {
        //         return res.send({
        //             status: 400,
        //             msg: '出错了'
        //         })
        //     }
        //     res.send({
        //         status: 200,
        //         msg: '查询成功',
        //         data: result
        //     })
        // })
    },
    // 新增一个分类
    addCate: (req, res) => {
        // 1.0 接收参数
        let params = req.body
        // 2.0 提交数据的到 mysql
        categorydb.addData(params, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增失败'
                })
            }
            res.send({
                status: 200,
                msg: '新增成功'
            })
        })
    },
    // 批量删除
    delAllCateByIds: (req, res) => {
        // 1.0 获取要删除的参数
        let ids = req.body.id // [1,2,3]
        ids = ids.join(',')
        // 2.0 调用方法
        categorydb.delCateByIds(ids, (err, result) => {
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
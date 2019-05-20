const path = require('path')
const formidable = require('formidable')
const wenzhangdb = require('../model/wenzhangdb.js')
module.exports = {
    // 渲染写文章页面
    postadd: (req, res) => {
        // 去 session 中获取两个参数
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('post-add', { nickname, avatar })
    },
    // 添加文章
    postsave: (req, res) => {
        // 接收参数
        let form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '新增失败'
                })
            }
            // 创建一个文章对象
            var obj = {
                slug: fields.slug,
                title: fields.title,
                created: fields.created,
                content: fields.content,
                status: fields.status,
                // 这是作者：去 session 的 user 中的 id 中获取
                user_id: req.session.user.id,
                category_id: fields.category
            }
            // 图片最后处理
            if (files.feature) {
                let name = path.basename(files.feature.path)
                obj.feature = name
            } else {
                obj.feature = ''
            }
            // console.log(obj)
            // 保存到数据库
            wenzhangdb.addpost(obj, (err1, result) => {
                if (err1) {
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
        })
    }
}
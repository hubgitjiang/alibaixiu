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
        // 将图片保存到 upload 中
        form.uploadDir = path.join(__dirname, '../uploads')
        form.keepExtensions = true
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
    },
    // 得到所有文章页面
    posts: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('posts', { nickname, avatar })
    },
    // 得到文章数据
    getPostData: (req, res) => {
        // 接收当前页 和 pagesize
        let page = req.query.page
        let pagesize = req.query.pagesize
        let sel = req.query.sel // 分类
        let sta = req.query.sta // 状态
        // 调用操作数据库的方法：
        let options = {
            page,
            pagesize,
            sel,
            sta
        }
        //   将当前页 和 页容量传入到操作 数据库的 方法中
        wenzhangdb.getPostsData(options, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: 'err'
                })
            }
            res.send({
                status: 200,
                msg: '成功',
                data: result
            })
        })
    },
    // 处理 得到编辑页面
    post_edit: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('post-edit', { nickname, avatar })
    },
    // 得到 文章通过 id
    getPostById: (req, res) => {
        // 1.0 接收参数
        let id = req.query.id
        // 2.0 获取数据
        wenzhangdb.getPostById(id, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '获取数据成功',
                data: result
            })
        })
    },
    // 修改文章
    updatePost: (req, res) => {
        // 接收参数
        var form = new formidable.IncomingForm()
        // 设置保存的路径
        form.uploadDir = path.join(__dirname, '../uploads')
        // 保留后缀
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            // 如果上传了图片需要得到图片的路径
            if (files.feature) {
                fields.feature = '/static/uploads/' + path.basename(files.feature.path)
            }
            // 将对象更新到数据库
            wenzhangdb.updatepost(fields, (err, result) => {
                if (err) {
                    return res.send({
                        status: 400,
                        msg: '出错啦'
                    })
                } 
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            })
        })
    }
}
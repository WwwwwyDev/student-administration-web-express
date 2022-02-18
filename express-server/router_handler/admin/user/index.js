const userService = require(`${process.cwd()}/db/user`)
const R = require(`${process.cwd()}/util/code`)
const bcrypt = require('bcryptjs')
const fs = require('fs');
const stringRandom = require('string-random');
// 添加用户
exports.addUser = async (req, res) => {
    if (req.user.username != "superadmin") return res.send({ code: R.NOSUPERPERMISSION, msg: "你不是超级管理员" })
    let user = req.body
    var { err, isExist } = await userService.isExistUserByUsername(user.username)
    if (err) return res.cc(err)
    if (isExist) return res.send({ code: R.EXIST, msg: "用户已经存在" })
    user.password = bcrypt.hashSync(user.password, 10)
    if (!/^(http|https):\/\/[\s\S]*/.test(user.avatar) && user.avatar) {
        let avatarname = "avatar" + stringRandom(16, { numbers: false }) + '.jpg'
        const path = process.cwd() + "/upload/" + avatarname
        const base64 = user.avatar.replace(/^data:image\/\w+;base64,/, "")//去掉图片base64码前面部分data:image/png;base64
        const dataBuffer = Buffer.from(base64, 'base64') //把base64码转成buffer对象，
        fs.writeFileSync(path, dataBuffer)
        user.avatar = avatarname
    }
    var { err, isSuccess } = await userService.addUser(user)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "添加成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "添加失败" })
    }
}

// 分页查询用户
exports.getUsers = async (req, res) => {
    var { err, users } = await userService.getUsers(req.query.page, req.query.limit, req.query.username)
    if (err) return res.cc(err)
    var { err, total } = await userService.getUsersTotal(req.query.username)
    if (err) return res.cc(err)
    return res.send({ code: R.SUCCESS, data: { users, total }, msg: "查询成功" })
}

// 更新用户
exports.updateUser = async (req, res) => {
    if (req.user.username != "superadmin") return res.send({ code: R.NOSUPERPERMISSION, msg: "你不是超级管理员" })
    let user = req.body
    user.password = bcrypt.hashSync(user.password, 10)
    if (!/^(http|https):\/\/[\s\S]*/.test(user.avatar)) {
        let avatarname = "avatar" + stringRandom(16, { numbers: false }) + '.jpg'
        const path = process.cwd() + "/upload/" + avatarname
        const base64 = user.avatar.replace(/^data:image\/\w+;base64,/, "")//去掉图片base64码前面部分data:image/png;base64
        const dataBuffer = Buffer.from(base64, 'base64') //把base64码转成buffer对象，
        fs.writeFileSync(path, dataBuffer)
        user.avatar = avatarname
    }
    user = { ...user, id: req.params.id }
    var { err, isSuccess } = await userService.updateUser(user)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "修改成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "修改失败" })
    }
}

// 删除用户
exports.delUser = async (req, res) => {
    if (req.user.username != "superadmin") return res.send({ code: R.NOSUPERPERMISSION, msg: "你不是超级管理员" })
    var { err, isExist } = await userService.isExistUserByID(req.params.id)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "用户不存在" })
    var { err, isSuccess } = await userService.delUser(req.params.id)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "删除成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "删除失败" })
    }
}
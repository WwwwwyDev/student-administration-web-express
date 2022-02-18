const userService = require(`${process.cwd()}/db/user`)
const R = require(`${process.cwd()}/util/code`)
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
const config = require("../../config")
// 登录的处理函数
exports.login = async (req, res) => {
    let loginUser = req.body
    var { err, user } = await userService.getUserByUsername(loginUser.username)
    if (err) return res.cc(err)
    if (!user) return res.send({ code: R.NOFOUND, msg: "不存在此用户" })
    const compareResult = bcrypt.compareSync(loginUser.password, user.password)
    if (!compareResult) {
        return res.send({ code: R.FAIL, msg: "密码错误" })
    }
    // 生成 Token 字符串
    const tokenStr = jwt.sign({id:user.id,username:user.username}, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn, // token 有效期
    })
    res.send({ code: R.SUCCESS, token: 'Bearer ' + tokenStr, msg: "登录成功" })
}
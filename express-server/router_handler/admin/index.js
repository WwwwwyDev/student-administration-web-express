const userService = require(`${process.cwd()}/db/user`)
const R = require(`${process.cwd()}/util/code`)
// 添加用户
exports.getUserInfo = async (req, res) => {
    var { err, user } = await userService.getUserByID(req.user.id)
    if (err) return res.cc(err)
    if (!user) return res.send({ code: R.NOFOUND, msg: "不存在此用户" })
    res.send({ code: R.SUCCESS, data:{...user,password:""}, msg: "登录成功" })
}
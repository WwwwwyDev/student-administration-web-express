const userService = require(`${process.cwd()}/db/user`)
const R = require(`${process.cwd()}/util/code`)
const bcrypt = require('bcryptjs')
// 添加用户
exports.addUser = async (req, res) => {
    let user = req.body
    var {err, isExist} = await userService.isExistUserByUsername(user.username)
    if(err) return res.cc(err)
    if(isExist) return res.send({code: R.EXIST,msg:"用户已经存在"})
    user.password = bcrypt.hashSync(user.password, 10)
    var {err, isSuccess} = await userService.addUser(user)
    if(err) return res.cc(err)
    if (isSuccess){
        return res.send({code: R.SUCCESS,msg:"添加成功"})
    }else{
        return res.send({code: R.FAIL,msg:"添加失败"})
    }
}

// 分页查询用户
exports.getUsers = (req, res) => {
    res.send('分页查询用户')
}

// 更新用户
exports.updateUser = (req, res) => {
    res.send('更新用户'+req.params.id)
}

// 删除用户
exports.delUser = (req, res) => {
    res.send('删除用户'+req.params.id)
}
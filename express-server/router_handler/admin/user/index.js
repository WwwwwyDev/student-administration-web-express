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
exports.getUsers = async (req, res) => {
    var {err, users} = await userService.getUsers(req.query.page,req.query.limit,req.query.username)
    if(err) return res.cc(err)
    var {err, total} = await userService.getUsersTotal()
    if(err) return res.cc(err)
    return res.send({code: R.SUCCESS,data:{users,total},msg:"查询成功"})
}

// 更新用户
exports.updateUser = async (req, res) => {
    let user =  req.body
    user.password = bcrypt.hashSync(user.password, 10)
    user = {...user,id: req.params.id}
    var {err, isSuccess} = await userService.updateUser(user)
    if(err) return res.cc(err)
    if (isSuccess){
        return res.send({code: R.SUCCESS,msg:"修改成功"})
    }else{
        return res.send({code: R.FAIL,msg:"修改失败"})
    }
}

// 删除用户
exports.delUser = async (req, res) => {
    var {err, isExist} = await userService.isExistUserByID(req.params.id)
    if(err) return res.cc(err)
    if(!isExist) return res.send({code: R.EXIST,msg:"用户不存在"})
    var {err, isSuccess} = await userService.delUser(req.params.id)
    if(err) return res.cc(err)
    if (isSuccess){
        return res.send({code: R.SUCCESS,msg:"删除成功"})
    }else{
        return res.send({code: R.FAIL,msg:"删除失败"})
    }
}
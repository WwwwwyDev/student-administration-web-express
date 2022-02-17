const query = require('../mysql')
const config = require(`${process.cwd()}/config`)

// 用户是否存在
exports.isExistUserByUsername = async (username) => {
    const sql = `select * from edu_admin_user where username=?`
    let { err, results } = await query(sql, username)
    if (err) return {err,isExist:true}
    if (results.length > 0) return {err:null,isExist:true}
    return {err:null,isExist:false}
}

// 添加用户
exports.addUser = async ({ username, password, avatar = config.defaultAvatar }) => {
    const sql = 'insert into edu_admin_user set ?'
    let { err, results } = await query(sql, { username, password, avatar });
    // 执行 SQL 语句失败
    if (err) return {err,isSuccess:false}
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return {err:null,isSuccess:false}
    // 更新用户头像成功
    return {err:null,isSuccess:true}
}

// 分页查询用户
exports.getUsers = () => {
    res.send('分页查询用户')
}

// 更新用户
exports.updateUser = () => {
    res.send('更新用户')
}

// 删除用户
exports.delUser = () => {
    res.send('删除用户' + req.params.id)
}
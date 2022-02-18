const query = require('../mysql')
const config = require(`${process.cwd()}/config`)

// 用户是否存在
exports.isExistUserByUsername = async (username) => {
    const sql = `select * from edu_admin_user where username=? and isdel=0`
    let { err, results } = await query(sql, username)
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}

exports.isExistUserByID = async (id) => {
    const sql = `select * from edu_admin_user where id=? and isdel=0`
    let { err, results } = await query(sql, parseInt(id))
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}

// 通过用户名获取用户
exports.getUserByUsername = async (username) => {
    const sql = `select * from edu_admin_user where username=?`
    let { err, results } = await query(sql, username)
    if (err) return { err, user: null }
    if (results.length != 1) return { err: null, user: null }
    return { err: null, user: results[0] }
}

// 通过用户id获取用户
exports.getUserByID = async (id) => {
    const sql = `select * from edu_admin_user where id=?`
    let { err, results } = await query(sql, parseInt(id))
    if (err) return { err, user: null }
    if (results.length != 1) return { err: null, user: null }
    return { err: null, user: results[0] }
}

// 添加用户
exports.addUser = async ({ username, password, avatar }) => {
    avatar = avatar || config.defaultAvatar
    const sql = 'insert into edu_admin_user set ?'
    let { err, results } = await query(sql, { username, password, avatar });
    // 执行 SQL 语句失败
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 添加成功
    return { err: null, isSuccess: true }
}

// 分页查询用户
exports.getUsers = async (page, limit, username) => {
    let sql = "SELECT id,username,avatar FROM edu_admin_user WHERE "
    let content = []
    if (username) {
        sql = sql + " username like ? and "
        content.push(`%${username}%`)
    }
    sql = sql + 'isdel = 0 '
    sql = sql + " LIMIT ? OFFSET ?"
    content.push(parseInt(limit), parseInt((page - 1) * limit))
    let { err, results } = await query(sql, content)
    if (err) return { err, users: null }
    return { err: null, users: results }
}

// 获取用户总数
exports.getUsersTotal = async (page, limit, username) => {
    let sql = "SELECT COUNT(*) FROM edu_admin_user"
    let { err, results } = await query(sql)
    if (err) return { err, total: -1 }
    return { err: null, total: results[0]['COUNT(*)'] }
}

// 更新用户
exports.updateUser = async ({ id, password, avatar }) => {
    avatar = avatar || config.defaultAvatar
    const sql = 'update edu_admin_user set ? where id = ?'
    let { err, results } = await query(sql, [{ password, avatar }, parseInt(id)]);
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}

// 删除用户
exports.delUser = async (id) => {
    const sql = 'update edu_admin_user set isdel = 1 where id = ?'
    let { err, results } = await query(sql, parseInt(id));
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}
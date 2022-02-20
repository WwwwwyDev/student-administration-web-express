const query = require('../mysql')
// const config = require(`${process.cwd()}/config`)


exports.isExistCourseByNum = async (num) => {
    const sql = `select * from edu_course where course_num=? and isdel=0`
    let { err, results } = await query(sql, num)
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}

exports.isExistCourseByID = async (id) => {
    const sql = `select * from edu_course where id=? and isdel=0`
    let { err, results } = await query(sql, parseInt(id))
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}


exports.getCourseByNumLike = async (num) => {
    const sql = `select * from edu_course where course_num like ?`
    let { err, results } = await query(sql, `%${num}%`)
    if (err) return { err, course: null }
    return { err: null, course: results }
}



exports.addCourse = async ({ num, name, teacher }) => {
    name = name || ""
    teacher = teacher || ""
    const sql = 'insert into edu_course set ?'
    let { err, results } = await query(sql, { 'course_num':num, 'course_name':name, 'course_teacher':teacher});
    // 执行 SQL 语句失败
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 添加成功
    return { err: null, isSuccess: true }
}


exports.getCourses = async (page, limit, num, name, teacher) => {
    let sql = "SELECT * FROM edu_course WHERE "
    let content = []
    if (num) {
        sql = sql + " course_num like ? and "
        content.push(`%${num}%`)
    }
    if (name) {
        sql = sql + " course_name like ? and "
        content.push(`%${name}%`)
    }
    if (teacher) {
        sql = sql + " course_teacher like ? and "
        content.push(`%${teacher}%`)
    }
    sql = sql + 'isdel = 0 '
    sql = sql + " LIMIT ? OFFSET ?"
    content.push(parseInt(limit), parseInt((page - 1) * limit))
    let { err, results } = await query(sql, content)
    if (err) return { err, courses: null }
    return { err: null, courses: results }
}


exports.getCoursesTotal = async (num, name, teacher) => {
    let sql = "SELECT COUNT(*) FROM edu_course WHERE "
    let content = []
    if (num) {
        sql = sql + " course_num like ? and "
        content.push(`%${num}%`)
    }
    if (name) {
        sql = sql + " course_name like ? and "
        content.push(`%${name}%`)
    }
    if (teacher) {
        sql = sql + " course_teacher like ? and "
        content.push(`%${teacher}%`)
    }
    sql = sql + 'isdel = 0 '
    let { err, results } = await query(sql, content)
    if (err) return { err, total: -1 }
    return { err: null, total: results[0]['COUNT(*)'] }
}


exports.updateCourse = async ({ id,  name, teacher }) => {
    name = name || ""
    teacher = teacher || ""
    const sql = 'update edu_course set ? where id = ?'
    let { err, results } = await query(sql, [ { 'course_name':name, 'course_teacher':teacher }, parseInt(id)]);
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}


exports.delCourse = async (id) => {
    const sql = 'update edu_course set isdel = 1 where id = ?'
    let { err, results } = await query(sql, parseInt(id));
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}
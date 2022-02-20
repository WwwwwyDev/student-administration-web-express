const query = require('../mysql')
// const config = require(`${process.cwd()}/config`)


exports.isExistStudentByNum = async (num) => {
    const sql = `select * from edu_student where student_num=? and isdel=0`
    let { err, results } = await query(sql, num)
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}

exports.isExistStudentByID = async (id) => {
    const sql = `select * from edu_student where id=? and isdel=0`
    let { err, results } = await query(sql, parseInt(id))
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}


exports.getStudentByNumLike = async (num) => {
    const sql = `select * from edu_student where student_num like ?`
    let { err, results } = await query(sql, `%${num}%`)
    if (err) return { err, student: null }
    return { err: null, student: results }
}



exports.addStudent = async ({ num, name, grade,_class , sex }) => {
    name = name || ""
    grade = grade || ""
    _class = _class || ""
    sex = sex || 0
    const sql = 'insert into edu_student set ?'
    let { err, results } = await query(sql, { 'student_num':num, 'student_name':name, 'student_grade':grade,'student_class':_class , 'student_sex':sex });
    // 执行 SQL 语句失败
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 添加成功
    return { err: null, isSuccess: true }
}


exports.getStudents = async (page, limit, num, name, grade,_class , sex) => {
    let sql = "SELECT * FROM edu_student WHERE "
    let content = []
    if (num) {
        sql = sql + " student_num like ? and "
        content.push(`%${num}%`)
    }
    if (name) {
        sql = sql + " student_name like ? and "
        content.push(`%${name}%`)
    }
    if (grade) {
        sql = sql + " student_grade like ? and "
        content.push(`%${grade}%`)
    }
    if (_class) {
        sql = sql + " student_class like ? and "
        content.push(`%${_class}%`)
    }
    if(sex) {
        sql = sql + " student_sex = ? and "
        content.push(parseInt(sex))
    }
    sql = sql + 'isdel = 0 '
    sql = sql + " LIMIT ? OFFSET ?"
    content.push(parseInt(limit), parseInt((page - 1) * limit))
    let { err, results } = await query(sql, content)
    if (err) return { err, students: null }
    return { err: null, students: results }
}


exports.getStudentsTotal = async (num, name, grade, _class , sex) => {
    let sql = "SELECT COUNT(*) FROM edu_student WHERE "
    let content = []
    if (num) {
        sql = sql + " student_num like ? and "
        content.push(`%${num}%`)
    }
    if (name) {
        sql = sql + " student_name like ? and "
        content.push(`%${name}%`)
    }
    if (grade) {
        sql = sql + " student_grade like ? and "
        content.push(`%${grade}%`)
    }
    if (_class) {
        sql = sql + " student_class like ? and "
        content.push(`%${_class}%`)
    }
    if(sex) {
        sql = sql + " student_sex like ? and "
        content.push(`%${sex}%`)
    }
    sql = sql + 'isdel = 0 '
    let { err, results } = await query(sql, content)
    if (err) return { err, total: -1 }
    return { err: null, total: results[0]['COUNT(*)'] }
}


exports.updateStudent = async ({ id, name, grade, _class , sex }) => {
    sex = sex || 0
    name = name || ""
    grade = grade || ""
    _class = _class || ""
    const sql = 'update edu_student set ? where id = ?'
    let { err, results } = await query(sql, [ {  'student_name':name, 'student_grade':grade,'student_class':_class , 'student_sex':sex }, parseInt(id)]);
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}


exports.delStudent = async (id) => {
    const sql = 'update edu_student set isdel = 1 where id = ?'
    let { err, results } = await query(sql, parseInt(id));
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}
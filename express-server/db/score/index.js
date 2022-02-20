const query = require('../mysql')
// const config = require(`${process.cwd()}/config`)
const sd = require("silly-datetime")


exports.isExistScoreByID = async (id) => {
    const sql = `select * from edu_score where id=? and isdel=0`
    let { err, results } = await query(sql, parseInt(id))
    if (err) return { err, isExist: true }
    if (results.length > 0) return { err: null, isExist: true }
    return { err: null, isExist: false }
}



exports.addScore = async ({ snum, cnum, score }) => { 
    snum = snum || ""
    cnum = cnum || ""
    score = score || 0
    const sql = 'insert into edu_score set ?'
    let { err, results } = await query(sql, { 'course_num': cnum, 'student_num': snum, 'score': parseFloat(score),'date': sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')});
    // 执行 SQL 语句失败
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 添加成功
    return { err: null, isSuccess: true }
}


exports.getScores = async (page, limit, cnum, snum) => {
    let sql = `SELECT
                edu_score.id,
                edu_score.course_num,
                edu_course.course_name,
                edu_student.student_name,
                edu_score.student_num,
                edu_score.score,
                edu_score.date
            FROM
                edu_score
                INNER JOIN edu_course ON edu_score.course_num = edu_course.course_num
                INNER JOIN edu_student ON edu_score.student_num = edu_student.student_num 
            WHERE `
    let content = []
    if (cnum) {
        sql = sql + "edu_score.course_num like ? and "
        content.push(`%${cnum}%`)
    }
    if (snum) {
        sql = sql + "edu_score.student_num like ? and "
        content.push(`%${snum}%`)
    }
    sql = sql + `edu_student.isdel = 0 
                AND edu_course.isdel = 0 
                AND edu_score.isdel = 0`
    sql = sql + " LIMIT ? OFFSET ?"
    content.push(parseInt(limit), parseInt((page - 1) * limit))
    let { err, results } = await query(sql, content)
    if (err) return { err, scores: null }
    return { err: null, scores: results }
}


exports.getScoresTotal = async (cnum, snum) => {
    let sql = `SELECT COUNT(*) FROM
                edu_score
                INNER JOIN edu_course ON edu_score.course_num = edu_course.course_num
                INNER JOIN edu_student ON edu_score.student_num = edu_student.student_num 
            WHERE `
    let content = []
    if (cnum) {
        sql = sql + "edu_score.course_num like ? and "
        content.push(`%${cnum}%`)
    }
    if (snum) {
        sql = sql + "edu_score.student_num like ? and "
        content.push(`%${snum}%`)
    }
    sql = sql + `edu_student.isdel = 0 
                AND edu_course.isdel = 0 
                AND edu_score.isdel = 0`
    let { err, results } = await query(sql, content)
    if (err) return { err, total: -1 }
    return { err: null, total: results[0]['COUNT(*)'] }
}


exports.updateScore = async ({ id,score }) => {
    score = score || 0
    const sql = 'update edu_score set ? where id = ?'
    let { err, results } = await query(sql, [{ 'score': parseFloat(score)}, parseInt(id)]);
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}


exports.delScore = async (id) => {
    const sql = 'update edu_score set isdel = 1 where id = ?'
    let { err, results } = await query(sql, parseInt(id));
    if (err) return { err, isSuccess: false }
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return { err: null, isSuccess: false }
    // 更新用户成功
    return { err: null, isSuccess: true }
}
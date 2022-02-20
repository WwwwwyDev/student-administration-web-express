const scoreService = require(`${process.cwd()}/db/score`)
const courseService = require(`${process.cwd()}/db/course`)
const studentService = require(`${process.cwd()}/db/student`)
const R = require(`${process.cwd()}/util/code`)
// 添加成绩
exports.addScore = async (req, res) => {
    if(!req.body.cnum) return res.send({ code: R.NOVALID, msg: "课程号为必填项" })
    if(!req.body.snum) return res.send({ code: R.NOVALID, msg: "学号为必填项" })
    let score = req.body
    var { err, isExist } = await courseService.isExistCourseByNum(score.cnum)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "不存在此课程" })
    var { err, isExist } = await studentService.isExistStudentByNum(score.snum)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "不存在此学生" })
    var { err, isSuccess } = await scoreService.addScore(score)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "添加成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "添加失败" })
    }
}

// 分页查询成绩
exports.getScores = async (req, res) => {
    var { err, scores } = await scoreService.getScores(req.query.page, req.query.limit, req.query.cnum,req.query.snum)
    if (err) return res.cc(err)
    var { err, total } = await scoreService.getScoresTotal( req.query.cnum,req.query.snum)
    if (err) return res.cc(err)
    return res.send({ code: R.SUCCESS, data: { scores, total }, msg: "查询成功" })
}

// 更新成绩
exports.updateScore = async (req, res) => {
    // if(!req.body.num) return res.send({ code: R.NOVALID, msg: "学号为必填项" })
    var { err, isExist } = await scoreService.isExistScoreByID(req.params.id)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "课程不存在" })
    let score = req.body
    score = { ...score, id: req.params.id }
    var { err, isSuccess } = await scoreService.updateScore(score)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "修改成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "修改失败" })
    }
}

// 删除成绩
exports.delScore = async (req, res) => {
    var { err, isExist } = await scoreService.isExistScoreByID(req.params.id)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "课程不存在" })
    var { err, isSuccess } = await scoreService.delScore(req.params.id)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "删除成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "删除失败" })
    }
}

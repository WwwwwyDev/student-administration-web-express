const studentService = require(`${process.cwd()}/db/student`)
const R = require(`${process.cwd()}/util/code`)
// 添加学生
exports.addStudent = async (req, res) => {
    if(!req.body.num) return res.send({ code: R.NOVALID, msg: "学号为必填项" })
    let student = req.body
    var { err, isExist } = await studentService.isExistStudentByNum(student.num)
    if (err) return res.cc(err)
    if (isExist) return res.send({ code: R.EXIST, msg: "学号重复" })
    var { err, isSuccess } = await studentService.addStudent(student)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "添加成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "添加失败" })
    }
}

// 分页查询学生
exports.getStudents = async (req, res) => {
    var { err, students } = await studentService.getStudents(req.query.page, req.query.limit, req.query.num,req.query.name,req.query.grade,req.query._class,req.query.sex)
    if (err) return res.cc(err)
    var { err, total } = await studentService.getStudentsTotal(req.query.num,req.query.name,req.query.grade,req.query._class,req.query.sex)
    if (err) return res.cc(err)
    return res.send({ code: R.SUCCESS, data: { students, total }, msg: "查询成功" })
}

// 更新学生
exports.updateStudent = async (req, res) => {
    // if(!req.body.num) return res.send({ code: R.NOVALID, msg: "学号为必填项" })
    let student = req.body
    student = { ...student, id: req.params.id }
    var { err, isSuccess } = await studentService.updateStudent(student)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "修改成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "修改失败" })
    }
}

// 删除学生
exports.delStudent = async (req, res) => {
    var { err, isExist } = await studentService.isExistStudentByID(req.params.id)
    if (err) return res.cc(err)
    if (!isExist) return res.send({ code: R.EXIST, msg: "用户不存在" })
    var { err, isSuccess } = await studentService.delStudent(req.params.id)
    if (err) return res.cc(err)
    if (isSuccess) {
        return res.send({ code: R.SUCCESS, msg: "删除成功" })
    } else {
        return res.send({ code: R.FAIL, msg: "删除失败" })
    }
}
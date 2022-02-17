// 添加学生
exports.addStudent = (req, res) => {
    res.send('添加学生')
}

// 分页查询学生
exports.getStudents = (req, res) => {
    res.send('分页查询学生')
}

// 更新学生
exports.updateStudent = (req, res) => {
    res.send('更新学生'+req.params.id)
}

// 删除学生
exports.delStudent = (req, res) => {
    res.send('删除学生'+req.params.id)
}
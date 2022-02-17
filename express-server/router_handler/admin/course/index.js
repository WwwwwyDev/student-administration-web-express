// 添加课程
exports.addCourse = (req, res) => {
    res.send('添加课程')
}

// 分页查询课程
exports.getCourses = (req, res) => {
    res.send('分页查询课程')
}

// 更新课程
exports.updateCourse = (req, res) => {
    res.send('更新课程'+req.params.id)
}

// 删除课程
exports.delCourse = (req, res) => {
    res.send('删除课程'+req.params.id)
}
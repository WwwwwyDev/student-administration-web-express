// 添加成绩
exports.addScore = (req, res) => {
    res.send('添加成绩')
}

// 分页查询成绩
exports.getScores = (req, res) => {
    res.send('分页查询成绩')
}

// 更新成绩
exports.updateScore = (req, res) => {
    res.send('更新成绩'+req.params.id)
}

// 删除成绩
exports.delScore = (req, res) => {
    res.send('删除成绩'+req.params.id)
}
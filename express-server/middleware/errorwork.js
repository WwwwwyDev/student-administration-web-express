
exports.errorWork =  () => {
    return function (req, res, next) {
        const R = require(`${process.cwd()}/util/code`)
        res.cc = function (err, code = R.ERROR) {
            res.send({
                // 状态
                code,
                // 状态描述，判断 err 是 错误对象 还是 字符串
                msg: err instanceof Error ? err.message : err,
            })
        }
        next()
    }
}

exports.errorWork =  () => {
    return function (req, res, next) {
        // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
        const R = require(`${process.cwd()}/util/code`)
        res.cc = function (err, code = R.ERROR) {
            res.send({
                // 状态
                code,
                // 状态描述，判断 err 是 错误对象 还是 字符串
                meg: err instanceof Error ? err.message : err,
            })
        }
        next()
    }
}
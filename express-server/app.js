// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
//配置解析 application/json 格式的表单数据的中间件
app.use(express.json())
// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwt.secret }).unless({ path: [/^\/api\//] }))
//配置自定义中间件
const middleware = require('./middleware/errorwork.js')
app.use(middleware.errorWork())
//注册路由
const apiRouter = require('./router/api')
const adminRouter = require('./router/admin')
app.use('/api', apiRouter)
app.use('/admin', adminRouter)


const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  const R = require(`${process.cwd()}/util/code`)
  if (err instanceof joi.ValidationError) return res.send({ code: R.NOVALID, msg: err.details[0].message })
  if (err.name === 'UnauthorizedError') return res.send({ code: R.NOPERMISSION, msg:"身份认证失败" })
  // 未知错误
  return res.send({ code: R.ERROR, msg: "后台异常" })
})
//404处理
app.use(function (req, res) {
  // 所有未处理的请求路径都会跑到这里
  // 404
  const R = require(`${process.cwd()}/util/code`)
  return res.send({ code: R.NOFOUND, msg: "NOFOUND" })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(config.port, config.hostname, function () {
  console.log(`server running at ${config.hostname}:${config.port}`)
})
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const apiHandler = require(`${process.cwd()}/router_handler/api`)
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { user_schema } = require(`${process.cwd()}/schema/user`)
// 登录
router.post('/login', expressJoi(user_schema[0]),apiHandler.login)

// 将路由对象共享出去
module.exports = router

const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const apiHandler = require(`${process.cwd()}/router_handler/api`)
// 登录
router.post('/login', apiHandler.login)

// 将路由对象共享出去
module.exports = router

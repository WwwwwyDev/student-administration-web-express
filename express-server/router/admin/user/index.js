const express = require('express')
// 创建路由对象
const router = express.Router()

const userHandler = require(`${process.cwd()}/router_handler/admin/user`)
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require(`${process.cwd()}/schema/user`)
router.get('/',userHandler.getUsers)
router.post('/',expressJoi(reg_login_schema),userHandler.addUser)
router.delete('/:id',userHandler.delUser)
router.put('/:id',userHandler.updateUser)


// 将路由对象共享出去
module.exports = router

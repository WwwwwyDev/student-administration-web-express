const express = require('express')
// 创建路由对象
const router = express.Router()

const studentHandler = require(`${process.cwd()}/router_handler/admin/student`)

router.get('/',studentHandler.getStudents)
router.post('/',studentHandler.addStudent)
router.delete('/:id',studentHandler.delStudent)
router.put('/:id',studentHandler.updateStudent)


// 将路由对象共享出去
module.exports = router

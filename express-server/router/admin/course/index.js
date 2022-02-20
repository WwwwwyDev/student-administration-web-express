const express = require('express')
// 创建路由对象
const router = express.Router()

const courseHandler = require(`${process.cwd()}/router_handler/admin/course`)

router.get('/',courseHandler.getCourses)
router.post('/',courseHandler.addCourse)
router.delete('/:id',courseHandler.delCourse)
router.put('/:id',courseHandler.updateCourse)
router.get('/searchNum/:num',courseHandler.searchCourseByNum)

// 将路由对象共享出去
module.exports = router

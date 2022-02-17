const express = require('express')
// 创建路由对象
const router = express.Router()

const userRouter = require('./user')
const scoreRouter = require('./score')
const studentRouter = require('./student')
const courseRouter = require('./course')
router.use('/user',userRouter)
router.use('/score',scoreRouter)
router.use('/student',studentRouter)
router.use('/course',courseRouter)
const adminHandler = require(`${process.cwd()}/router_handler/admin`)
router.get('/userinfo',adminHandler.getUserInfo)

// 将路由对象共享出去
module.exports = router

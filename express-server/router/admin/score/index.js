const express = require('express')
// 创建路由对象
const router = express.Router()

const scoreHandler = require(`${process.cwd()}/router_handler/admin/score`)

router.get('/',scoreHandler.getScores)
router.post('/',scoreHandler.addScore)
router.delete('/:id',scoreHandler.delScore)
router.put('/:id',scoreHandler.updateScore)


// 将路由对象共享出去
module.exports = router

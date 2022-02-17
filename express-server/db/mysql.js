// 导入 mysql 模块
const mysql = require('mysql')
//加载配置文件
const config = require("../config")
// 创建数据库连接对象
const pool = mysql.createPool(config.mysql)

let query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( {err, results:null} )
        } else {
          connection.query(sql, values, ( err, results) => {
            resolve ({err, results})
            // 结束会话
            connection.release()
          })
        }
      })
    })
  }
// 向外共享 query
module.exports = query

const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则：只能是包含 a-zA-Z0-9 的字符串，最小1位，最大10位
const username = joi.string().min(1).max(12).required()
// 密码的验证规则：长度6-18位  字符串类型：数字 英文 特殊符号且必须包含数字及英文 
const password = joi
  .string()
  .pattern(/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/)
  .required()
const avatar = joi.string().min(0)
// 注册和登录表单的验证规则对象
exports.user_schema = [{
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    avatar,
  },
},{
  // 表示需要对 req.body 中的数据进行验证
  body: {
    password,
    avatar
  },
}]

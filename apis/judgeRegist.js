const userStore = require('../models/userStore')

let checkWhichFormat = (obj) => {
  if (obj.hasOwnProperty('username')) return /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/
  if (obj.hasOwnProperty('password')) return /^[a-zA-Z0-9_-]{6,12}$/
}

let englishToChinese = (str) => {
  switch (str) {
    case 'username': return '用户名'
    case 'password': return '密码'
    case 'verify':   return '再次输入'
    case 'captcha':  return '验证码'
  }
}

module.exports = {
  checkWhetherIsEmpty: (obj, session) => {
    if (obj[obj.property] == '') {
      session[obj.property + 'Pass'] = false
      return {
        'success': false,
        'msg': englishToChinese(obj.property) + '不能为空'
      }
    }
    return {'success': true}
  },
  checkWhetherIsFormatbale: (obj, session) => {
    if (obj.property == 'captcha') {
      if (session.captcha != obj.captcha) {
        session['captchaPass'] = false
        return {'success': false, 'msg': '验证码错误'}
      }
      session['captchaPass'] = true
      return {'success': true}
    }
    else if (obj.property == 'verify') {
      if (obj.password != obj.verify) {
        session['verifyPass'] = false
        return {
          'success': false,
          'msg': '两次输入应该相同'
        }
      }
    } else {
      if (!checkWhichFormat(obj).test(obj[obj.property])) {
        session[obj.property + 'Pass'] = false
        return {
          'success': false,
          'msg': englishToChinese(obj.property) + '格式不正确'
        }
      }
      if (obj.property == 'password' && session['verifyPass'] && obj.password != obj.verify)
        return {
          'success': false,
          'msg': '两次输入应该相同'
        }
    }
    return {'success': true}
  },
  checkWhetherIsExist: async (obj, session) => {
    if (obj.property == 'username') {
      let docs = await userStore.findByUsername(obj.username)
      if (docs) {
        session['usernamePass'] = false
        return ({
          'success': false,
          'msg': englishToChinese(obj.property) + '已存在'          
        })
      }
    }
    session[obj.property + 'Pass'] = true
    return {'success': true}
  }
}
const userStore = require('../models/userStore')

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
  check: async (obj, session) => {
    if (obj.property == 'username') {
      let docs = await userStore.findByUsername(obj.username)
      if (docs) {
        session['usernamePass'] = true
        return ({
          'success': true,
          'property': 'username'
        })
      }
      session['usernamePass'] = false
      return {'success': false, 'msg': '用户名不存在'}
    }
    else if (obj.property == 'password') {
      let docs = await userStore.findByUsername(obj.username)
      if (!docs) {
        session['passwordPass'] = false
        return {'success': false, 'msg': '用户名不存在'}  //  找不到用户名
      }
      else {
        let key = docs.key
        docs = await userStore.findByUsernameAndPassword(obj.username, obj.password, key)
        if (docs) {
          session['passwordPass'] = true
          return {'success': true}
        }
        session['passwordPass'] = false
        return {'success': false, 'msg': '密码错误'}
      }
    }
    else {
      if (session.captcha != obj.captcha) {
        session['captchaPass'] = false
        return {'success': false, 'msg': '验证码错误'}
      }
      session['captchaPass'] = true
      return {'success': true}
    }
  }
}
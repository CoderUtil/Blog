const express = require('express')
const router = express.Router()
const judgeSignin = require('../apis/judgeSignin')

router.get('/', (req, res, next) => {
  req.session.usernamePass = false
  req.session.passwordPass = false
  req.session.captchaPass = false

  if (req.session.signin) res.redirect(req.session.username + '/home')
  else {
    res.status(200)
    res.type('text/html')
    res.render('signin.hbs')
  }
})

router.post('/judge', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let result = judgeSignin.checkWhetherIsEmpty(req.body, req.session)
  if (!result.success) 
    return res.send(result)
  
  result = await judgeSignin.check(req.body, req.session)

  res.send(result)
})

router.post('/pass', (req, res, next) => {
  res.status(200)
  res.type('application/json')

  if (!req.session.usernamePass || !req.session.passwordPass || !req.session.captchaPass) 
    return res.send({'success': false})
  res.send({'success': true}) 
})

router.post('/submit', (req, res, next) => {
  res.status(200)
  res.type('application/json')

  delete req.session.usernamePass
  delete req.session.passwordPass
  delete req.session.captchaPass
  delete req.session.captcha

  req.session.signin = true
  req.session.username = req.body.username

  res.send({'success': true}) 
})

module.exports = router

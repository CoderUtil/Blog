const express = require('express')
const router = express.Router()
const judgeRegist = require('../apis/judgeRegist')
const useCrypto = require('../apis/useCrypto')
const userStore = require('../models/userStore')

router.get('/', (req, res, next) => {
  res.status(200)
  res.type('text/html')

  req.session.usernamePass = false
  req.session.passwordPass = false
  req.session.verifyPass = false
  req.session.captchaPass = false

  res.render('regist.hbs')
})

router.post('/judge', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let result = judgeRegist.checkWhetherIsEmpty(req.body, req.session)
  if (!result.success) 
    return res.send(result)

  result = judgeRegist.checkWhetherIsFormatbale(req.body, req.session)
  if (!result.success) 
    return res.send(result)
  
  result = await judgeRegist.checkWhetherIsExist(req.body, req.session)

  res.send(result)
})

router.post('/pass', (req, res) => {
  res.status(200)
  res.type('application/json')

  if (!req.session.usernamePass || !req.session.passwordPass || !req.session.verifyPass 
    || !req.session.captchaPass) 
    return res.send({'success': false})

  res.send({'success': true}) 
})

router.post('/submit', async (req, res) => {
  let keyAndValue = useCrypto.encrypt(req.body.password)

  await userStore.createUser(req.body.username, keyAndValue.value, keyAndValue.key)

  delete req.session.usernamePass
  delete req.session.passwordPass
  delete req.session.verifyPass
  delete req.session.captchaPass
  delete req.session.captcha

  req.session.signin = true
  req.session.username = req.body.username
  res.send()
})

module.exports = router
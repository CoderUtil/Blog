const express = require('express')
const router = express.Router()
const generateCaptcha = require('../apis/generateCaptcha')

router.get('/', (req, res, next) => {
  res.status(200)
  res.type('image/png')
  res.send(generateCaptcha.generateCaptcha(req.session))
})

module.exports = router
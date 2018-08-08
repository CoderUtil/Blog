const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  delete req.session.signin 
  delete req.session.username 
  res.redirect('/signin')
})

router.post('/', (req, res, next) => {
  delete req.session.signin 
  delete req.session.username 
  res.redirect('/signin')
})

module.exports = router
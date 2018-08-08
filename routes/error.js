const express = require('express')
const router = express.Router()

router.use('/', (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error.hbs', {'message': err.message, 'status': err.status})
})

module.exports = router

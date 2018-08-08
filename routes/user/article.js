const express = require('express')
const router = express.Router()
const userStore = require('../../models/userStore')
const articleStore = require('../../models/articleStore')
const userAndArticleStore = require('../../models/userAndArticleStore')
const format = require('../../apis/format')

router.get('/:title', async (req, res, next) => {
  res.status(200)
  res.type('text/html')
  if (req.session.signin) 
    return res.render('user/article.hbs', {'username': req.session.username, 'title': req.params.title})
  res.redirect('/signin')
}) 

router.post('/:title', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await articleStore.findArticleByUsernameAndTitle(req.session.username, req.params.title)
  docs = format.formatObject(docs)
  res.send(docs)
})

router.post('/:title/lastAndNext', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await userAndArticleStore.findArticleByUsernameAndTitle(req.session.username, req.params.title)
  let lastAndNext = await userAndArticleStore.findNextAndLastTitleByUsernameAndId(req.session.username, docs.identifier)
  res.send(lastAndNext)
})

module.exports = router

const express = require('express')
const router = express.Router()
const userStore = require('../../models/userStore')
const articleStore = require('../../models/articleStore')
const userAndArticleStore = require('../../models/userAndArticleStore')
const format = require('../../apis/format')

router.get('/', async (req, res, next) => {
  res.status(200)
  res.type('text/html')
  if (req.session.signin) {
    delete req.session.showWhichClassificationTitle
    return res.render('user/manage.hbs', {'username': req.session.username})
  }
  res.redirect('/signin')
})

/*
  当左侧选择的标签不同时, 右侧的内容不同
 */
router.get('/:classification', async (req, res, next) => {
  res.status(200)
  res.type('text/html')
  if (req.session.signin) {
    let docs = await userStore.findByUsername(req.session.username)
    req.session.showWhichClassificationTitle = req.params.classification
    return res.render('user/manage.hbs', {'username': req.session.username})
  }
  res.redirect('/signin')
})

router.post('/', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  if (req.body.get == 'left') {
    let docs = await articleStore.findClassificationByUsername(req.session.username)
    res.send(docs)
  }
  else {
    let docs = {}
    if (req.session.showWhichClassificationTitle == null)
      docs = await articleStore.findArticleByUsername(req.session.username)
    else 
      docs = await articleStore.findArticleByUsernameAndClassification(req.session.username, req.session.showWhichClassificationTitle)
    return res.send({'article':format.formatArray(docs), 'classification': req.session.showWhichClassificationTitle})
  }
})

router.post('/delete', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  await articleStore.deleteArticleByUsernameAndTitle(req.session.username, req.body.title)
  await userAndArticleStore.deleteArticleByUsernameAndTitle(req.session.username, req.body.title)
  res.send({'success': true})
})

router.post('/modify', async (req, res, next) => {
  req.session.title = req.body.title
  let docs = await articleStore.findArticleByUsernameAndTitle(req.session.username, req.body.title)
  req.session.classification = docs.classification
  req.session.content = docs.content
  res.status(200)
  res.type('application/json')
  res.send({'success': true})
})


module.exports = router

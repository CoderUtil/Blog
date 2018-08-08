const express = require('express')
const router = express.Router()
const articleStore = require('../../models/articleStore')
const userAndArticleStore = require('../../models/userAndArticleStore')
const draftStore = require('../../models/draftStore')

router.get('/', async (req, res, next) => {
  res.status(200)
  res.type('text/html')
  if (req.session.signin) {
    let title = req.session.title
    let classification = req.session.classification
    let content = req.session.content

    delete req.session.title
    delete req.session.classification
    delete req.session.content

    return res.render('user/write.hbs', {
      'username': req.session.username, 
      'title': title, 
      'classification': classification,
      'content': content
    })
  }
  res.redirect('/signin')
})

router.post('/', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  if (await articleStore.findArticleByUsernameAndTitle(req.session.username, req.body.title) != null) 
    await articleStore.modifyArticle(req.session.username, req.body.title, req.body.content, req.body.classification)
  else {
    let docs = await articleStore.findArticleByUsername(req.body.username)
    await userAndArticleStore.createUserAndArticle(req.body.username, req.body.title, docs.length)

    docs = await articleStore.findAllArticle()
    await articleStore.createArticle(req.body.username, req.body.title, req.body.content, req.body.classification, docs.length)
  }
  //  删除草稿
  if (await draftStore.findDraftByUsernameAndTitle(req.session.username, req.body.title) != null)
    await draftStore.deleteDraft(req.session.username, req.body.title)
  res.send({'success': true})
})

router.post('/save', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  if (await draftStore.findDraftByUsernameAndTitle(req.session.username, req.body.title) == null)
    await draftStore.createDraft(req.session.username, req.body.title, req.body.content, req.body.classification)
  else 
    await draftStore.updateDraft(req.session.username, req.body.title, req.body.content, req.body.classification)
  res.send({'success': true})
})

router.post('/judge', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await articleStore.findArticleByUsernameAndTitle(req.session.username, req.body.title)
  if (docs == null)
    return res.send({'success': false})
  res.send({'success': true})
})

module.exports = router

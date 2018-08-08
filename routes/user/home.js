const express = require('express')
const router = express.Router()
const userStore = require('../../models/userStore')
const articleStore = require('../../models/articleStore')
const collectStore = require('../../models/collectStore')
const format = require('../../apis/format')

router.get('/', async (req, res, next) => {
  res.status(200)
  res.type('text/html')
  if (req.session.signin) 
    return res.render('user/home.hbs', {'username': req.session.username})
  res.redirect('/signin')
}) 

router.post('/main', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await articleStore.findArticleByUsername(req.session.username)
  res.send(format.formatArray(docs))
})

//  推送没有收藏过的文章
router.post('/recommend', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await articleStore.findAllTitle()
  let collects = await collectStore.findCollectByUsername(req.session.username)

  while (true) {
    let find = false
    let i
    let j
    for (i = 0; i < docs.length; i++) {
      for (j = 0; j < collects.length; j++) {
        if ((docs[i].title == collects[j].title) && (docs[i].username == collects[j].author)) {
          find = true
          break
        }
      }
      if (find == true)
        break
    }
    docs.splice(i, 1)
    collects.splice(j, 1)

    if (find == false)
      break
  }

  res.send(format.formatRecommend(docs))
})

router.post('/collect', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await collectStore.createCollect(req.body.username, req.body.title, req.body.author)
  res.send({'success': true})
})

router.post('/cancelCollect', async (req, res, next) => {
  res.status(200)
  res.type('application/json')
  let docs = await collectStore.deleteCollect(req.body.username, req.body.title, req.body.author)
  res.send({'success': true})
})

module.exports = router

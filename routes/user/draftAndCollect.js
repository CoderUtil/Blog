const express = require('express')
const router = express.Router()
const userStore = require('../../models/userStore')
const collectStore = require('../../models/collectStore')
const draftStore = require('../../models/draftStore')
const format = require('../../apis/format')

router.get('/', async (req, res, next) => {
    res.status(200)
    res.type('text/html')
    if (req.session.signin) {
        req.session.state = 'collect'
        return res.render('user/draftAndCollect.hbs', {'username': req.session.username})
    }
    res.redirect('/signin')
}) 

router.get('/:state', async (req, res, next) => {
    res.status(200)
    res.type('text/html')
    if (req.session.signin) {
      let docs = await userStore.findByUsername(req.session.username)
      req.session.state = req.params.state
      return res.render('user/draftAndCollect.hbs', {'username': req.session.username})
    }
    res.redirect('/signin')
})

router.post('/', async (req, res, next) => {
    res.status(200)
    res.type('application/json')
    let docs = {}
    if (req.session.state == 'collect') 
        docs = await collectStore.findCollectByUsername(req.session.username)
    else 
        docs = await draftStore.findDraftByUsername(req.session.username)
    return res.send({'article':format.formatDraftAndCollect(docs), 'state': req.session.state})
})

router.post('/delete', async (req, res, next) => {
    res.status(200)
    res.type('application/json')
    if (req.session.state == 'collect') 
        await collectStore.deleteCollect(req.session.username, req.body.title)
    else 
        await draftStore.deleteDraft(req.session.username, req.body.title)
    res.send({'success': true})
})

router.post('/look', async (req, res, next) => {
    req.session.title = req.body.title
    let docs = await draftStore.findDraftByUsernameAndTitle(req.session.username, req.body.title)
    req.session.classification = docs.classification
    req.session.content = docs.content
    res.status(200)
    res.type('application/json')
    res.send({'success': true})
  })

module.exports = router
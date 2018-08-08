const express = require('express')
const app = express()
const db = require('../apis/connectMongo')

let draftSchema = new db.Schema({
    username:       {type: String},
    title:          {type: String},
    content:        {type: String},
    classification: {type: String}
  }, {collection: 'draft'})    
  
let draftModel = db.model('draftModel', draftSchema)  

module.exports = {
  //  创建记录
  createDraft: async (username, title, content, classification) => {
    try {
      await draftModel.create({
        'username':       username,
        'title':          title,
        'content':        content,
        'classification': classification
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  删除记录
  deleteDraft: async (username, title) => {
    try {
      await draftModel.remove({
        'username': username,
        'title':    title
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  更新记录
  updateDraft: async (username, title, content, classification) => {
    try {
      await draftModel.update({
        'username':       username,
        'title':          title
      }, {
        $set: {
          'content': content,
          'classification': classification
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名查找记录
  findDraftByUsername: async (username) => {
    try {
        let docs = await draftModel.find({
          'username': username
        }, {
            '_id': 0
        })
        return docs
    } catch (err) {
        console.log(err)
    }
  },
  //  根据用户名和草稿名查找记录
  findDraftByUsernameAndTitle: async (username, title) => {
    try {
      let docs = await draftModel.findOne({
        'username': username,
        'title':    title
      })
      return docs
    } catch (err) {
      console.log(err)
    }
  }
}
const express = require('express')
const app = express()
const db = require('../apis/connectMongo')

let collectSchema = new db.Schema({
    username:       {type: String},
    title:          {type: String},
    author:         {type: String}
  }, {collection: 'collect'})    
  
let collectModel = db.model('collectModel', collectSchema)  

module.exports = {
  //  创建记录
  createCollect: async (username, title, author) => {
    try {
      await collectModel.create({
        'username':       username,
        'title':          title,
        'author':         author   
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  删除记录
  deleteCollect: async (username, title) => {
    try {
      await collectModel.remove({
        'username': username,
        'title':    title
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名查找记录
  findCollectByUsername: async (username) => {
    try {
        let docs = await collectModel.find({
          'username': username
        }, {
            '_id': 0
        })
        return docs
    } catch (err) {
        console.log(err)
    }
  }
}
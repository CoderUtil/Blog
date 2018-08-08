const express = require('express')
const app = express()
const db = require('../apis/connectMongo')

let userAndArticleSchema = new db.Schema({
    username:     {type: String},
    title:        {type: String},
    identifier:   {type: Number}      //  文章在当前用户的文章中的排名
  }, {collection: 'userAndArticle'}) 

  let userAndArticleModel = db.model('userAndArticleModel', userAndArticleSchema)  

  module.exports = {
    //  创建记录
    createUserAndArticle: async (username, title, identifier) => {
        try {
            await userAndArticleModel.create({
                'username':     username,
                'title':        title,
                'identifier':   identifier
            })
        } catch (err) {
            console.log(err)
        }
    },  
    //  根据用户和文章名查找id
    findArticleByUsernameAndTitle: async (username, title) => {
        try {
          let docs = await userAndArticleModel.findOne({
            'username': username,
            'title': title
          })
          return docs
        } catch (err) {
          console.log(err)
        }
    },
    //  根据用户和id查找前一个和后一个id
    findNextAndLastTitleByUsernameAndId: async (username, identifier) => {
        try {
          let lastAndNext = {}
          
          let last = await userAndArticleModel.findOne({'identifier': identifier - 1})
          if (last == null)
            lastAndNext.last = false 
          else
            lastAndNext.last = last.title
    
          let next = await userAndArticleModel.findOne({'identifier': identifier + 1})
          if (next == null)
            lastAndNext.next = false 
          else
            lastAndNext.next = next.title
          return lastAndNext
        } catch (err) {
          console.log(err)
        }
    },
    //  根据用户和文章名删除记录
    deleteArticleByUsernameAndTitle: async (username, title) => {
        try {
            let docs = await userAndArticleModel.findOne({
                'username': username,
                'title': title
            })
            await userAndArticleModel.update({
                'username': username,
                'identifier': {
                    '$gt': docs.identifier
                }
            }, {
                $inc: {'identifier': -1}
            })
            
            await userAndArticleModel.remove({
                'username': username,
                'title': title
            })
        } catch (err) {
            console.log(err)
        }
    }
  }
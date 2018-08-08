const express = require('express')
const app = express()
const db = require('../apis/connectMongo')
 
let articleSchema = new db.Schema({
  username:       {type: String},
  title:          {type: String},
  content:        {type: String},
  date:           {type: Date, default: new Date()},
  classification: {type: String},
  identifier:     {type: Number}      //  文章在所有文章中的排名
}, {collection: 'article'})    

let articleModel = db.model('articleModel', articleSchema)  

module.exports = {
  //  创建记录
  createArticle: async (username, title, content, classification, identifier) => {
    try {
      await articleModel.create({
        'username':       username,
        'title':          title,
        'content':        content,
        'classification': classification,
        'identifier':     identifier    
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  查找所有记录
  findAllArticle: async () => {
    try {
      let docs = await articleModel.find({})
      return docs
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名查找记录    
  findArticleByUsername: async (username) => {
    try {
        let docs = await articleModel.find({
          'username': username
        }, {
            '_id': 0
        }, {
            sort: {'identifier': -1}
        })
        return docs
    } catch (err) {
        console.log(err)
    }
  },
  //  查找所有文章的文章名和作者
  findAllTitle: async () => {
    try {
        let docs = await articleModel.find({}, {
            'username': 1,
            'title': 1
        },{
          sort: {"identifer": -1}
        })
        return docs
    } catch (err) {
        console.log(err)
    }
  },
  //  根据用户名查找分类
  findClassificationByUsername: async (username) => {
    try {
      let docs = await articleModel.find({
        'username': username
      }, {
        '_id': 0
      }, {
        sort: {'classification': 1}
      })
      let arr = []
      if (docs.length != 0) {
        let temp = docs[0].classification
        arr.push({'classification': temp})
        for (let i = 0; i < docs.length; i++) {
          if (docs[i].classification != temp) {
            temp = docs[i].classification
            arr.push({'classification': temp})
          }
        }
      }
      return {'classifications': arr}
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名和分类查找文章
  findArticleByUsernameAndClassification: async (username, classification) => {
    try {
      let docs = await articleModel.find({
        'username': username,
        'classification': classification
      })
      return docs
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名和文章查找记录
  findArticleByUsernameAndTitle: async (username, title) => {
    try {
      let docs = await articleModel.findOne({
        'username': username,
        'title':    title
      })
      return docs
    } catch (err) {
      console.log(err)
    }
  },
  //  修改记录
  modifyArticle: async (username, title, content, classification) => {
    try {
      await articleModel.update({
        'username':       username,
        'title':          title
      }, {
        $set: {
          'content': content,
          'classification': classification,
          'date': new Date()
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户和文章名删除文章
  deleteArticleByUsernameAndTitle: async (username, title) => {
    try {
      let docs = await articleModel.findOne({
        'username': username,
        'title': title
      })
      await articleModel.update({
        'identifier': {
          '$gt': docs.identifier
        }
      }, {
        $inc: {'identifier': -1}
      })
      
      await articleModel.remove({
        'username': username,
        'title': title
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const express = require('express')
const app = express()
const db = require('../apis/connectMongo')
const useCrypto = require('../apis/useCrypto')

let userSchema = new db.Schema({
    username:     {type: String},
    password:     {type: String},
    key:          {type: String}
}, {collection: 'user'})       

let userModel = db.model('userModel', userSchema)

module.exports = {
  //  创建记录
  createUser: async (username, password, key) => {
    try {
      await userModel.create({
        'username': username,
        'password': password,
        'key':      key
      })
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名查找记录
  findByUsername: async (username) => {
    try {
      let docs = await userModel.findOne({'username': username})
      return docs
    } catch (err) {
      console.log(err)
    }
  },
  //  根据用户名和密码查找记录
  findByUsernameAndPassword: async (username, password, key) => {
    try {
      let docs = await userModel.findOne({
        'username': username,
        'password': useCrypto.check(password, key)
      })
      return docs
    } catch (err) {
      console.log(err)
    }
  }
}

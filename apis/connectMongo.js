const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/users', {useMongoClient: true})  //  使用数据库users

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.on('disconnected', () => { console.log('disconnection\n') })
db.on('connected', () => { console.log('connection sucess\n') })

module.exports = mongoose
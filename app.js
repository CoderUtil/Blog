const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const captcha = require('./routes/captcha')
const signin = require('./routes/signin')
const regist = require('./routes/regist')
const home = require('./routes/user/home')
const write = require('./routes/user/write')
const manage = require('./routes/user/manage')
const draftAndCollect = require('./routes/user/draftAndCollect')
const article = require('./routes/user/article')
const exit = require('./routes/user/exit')
const error = require('./routes/error')

app.set('views', path.join(__dirname, '/views'))
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60 * 1000 * 30},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({   
    mongooseConnection: mongoose.connection 
  })
}))

app.use('/captcha', captcha)
app.use('/signin', signin)
app.use('/regist', regist)
app.use('/:user/home', home)
app.use('/:user/write', write)
app.use('/:user/manage', manage)
app.use('/:user/draftAndCollect', draftAndCollect)
app.use('/:user/article', article)
app.use('/:user/exit', exit)
app.use('/', error)

module.exports = app

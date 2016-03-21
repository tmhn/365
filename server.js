'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const dotenv = require('dotenv')

dotenv.load()

let app = express()
let port = process.env.PORT || 3365
let env = process.env.NODE_ENV || 'development'

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL)

app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

if (env === 'development') {
  app.use(logger('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))

// API Routes
app.use(require('./components/user/controller'))
app.use(require('./components/memory/controller'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log('365 listening on port %d', port)
})

'use strict'

const express = require('express')
const createToken = require('../../lib/create-token')
const User = require('./model')

let router = express.Router()

router.post('/api/user', (req, res) => {
  let user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message || err })
    }

    res.status(201).json({ token: createToken(user) })
  })
})

router.post('/auth', (req, res) => {
  User.login(req.body.email, req.body.password, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message })
    }

    req.session.user = user

    res.status(200).json({ token: createToken(user) })
  })
})

module.exports = router

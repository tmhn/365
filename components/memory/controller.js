'use strict'

const express = require('express')
const jwt = require('express-jwt')
const Memory = require('./model')

let router = express.Router()

router.post('/api/memory', jwt({ secret: process.env.JWT_SECRET }), (req, res) => {
  let memory = new Memory({
    text: req.body.text,
    user: req.session.user._id.toString()
  })

  memory.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    res.sendStatus(201)
  })
})

module.exports = router

'use strict'

const express = require('express')
const jwt = require('express-jwt')
const Memory = require('./model')

let router = express.Router()
let checkJwt = jwt({ secret: process.env.JWT_SECRET })

router.post('/api/memory', checkJwt, (req, res) => {
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

router.get('/api/memory', checkJwt, (req, res) => {
  let year = req.query.year
  let query = {
    user: req.session.user._id.toString(),
    dateCreated: {
      $gte: new Date(year, 0, 1),
      $lte: new Date(year, 11, 31)
    }
  }

  Memory.find(query, (err, memories) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    res.status(200).json(memories)
  })
})

module.exports = router

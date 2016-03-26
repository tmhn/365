'use strict'

const jwt = require('jsonwebtoken')

function createToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7 days' })
}

module.exports = createToken

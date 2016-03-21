'use strict'

const jwt = require('jsonwebtoken')

function createToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 5 })
}

module.exports = createToken

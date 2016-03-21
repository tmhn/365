'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
})

function hashPassword (next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
}

UserSchema.pre('save', hashPassword)

UserSchema.statics.login = function (email, password, callback) {
  this.findOne({ email: email }, (err, user) => {
    if (err) return callback(err)
    if (!user) {
      let err = new Error('Looks like there isn\'t a user with that email address.')
      return callback(err)
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return callback(err)
      if (!match) {
        let err = new Error('Look\'s like your password is wrong.')
        return callback(err)
      }
      callback(null, user)
    })
  })
}

let User = mongoose.model('User', UserSchema)

module.exports = User

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MemorySchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
})

let Memory = mongoose.model('Memory', MemorySchema)

module.exports = Memory

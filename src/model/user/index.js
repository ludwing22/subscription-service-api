const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  ein: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  creditCard: {
    number: {
      type: String,
      require: true
    },
    cvc: {
      type: Number,
      require: true
    }
  }
}, { timestamps: true })

const userModel = model('user', userSchema)

module.exports = userModel
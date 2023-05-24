const mongoose = require('mongoose')

const { Schema, model, Types } = mongoose

const subscriptionSchema = new Schema({
  user: {
    type: Types.ObjectId,
    refer: 'User'
  },
  product: {
    type: Types.ObjectId,
    refer: 'User'
  },
  recurrence: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly' ]
  },
  status: {
    type: String,
    enum: ['pending', 'canceled', 'concluded' ]
  },
  payments: [
    {
      price: Number,
      name: String,
      payDay: Date,
      address: String,
      status: {
        type: String,
        enum: ['pending', 'canceled', 'concluded' ]
      }
    }
  ]
}, { timestamps: true })

const subscriptionModel = model('subscription', subscriptionSchema)

module.exports = subscriptionModel
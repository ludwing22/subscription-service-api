const mongoose = require('mongoose')

const { Schema, model } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    min: 0.01,
    require: true
  },
  stock: {
    type: Number,
    min: 0
  }
}, { timestamps: true })

const productModel = model('product', productSchema)

module.exports = productModel
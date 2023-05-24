const ProductModel = require('../../model/product')

async function create (product) {
  try {
    const productResponse = await ProductModel(product).save()

    return productResponse
  } catch (error) {
    console.log(error)
  }
}

async function get () {
  try {
    const productResponse = await ProductModel.find({})

    return productResponse
  } catch (error) {
    console.log(error)
  }
}

async function getById (_id) {
  try {
    const productResponse = await ProductModel.findById(_id)

    return productResponse
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  create,
  get,
  getById
}
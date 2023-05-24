const ProductService = require('../../service/product')
const { response } = require('../../libs/buildResponse')

async function getProducts (event, context, callback) {
  console.log('user connect')
  console.log(event.params)
  console.log(event.body)

  try {
    const products = await ProductService.get()
    return products
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

async function getProductById (event) {
  const { _id } = event.params

  try {
    const product = await ProductService.getById(_id)
    if (product) return product
    throw new Error('Produto não encontrado')
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

async function postProduct (event) {
  const productBody = event.body

  try {
    const product = await ProductService.create(productBody)
    return product
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

module.exports = {
  getProducts,
  getProductById,
  postProduct
}
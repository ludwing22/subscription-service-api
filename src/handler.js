
const userController = require('./controllers/user')
const productController = require('./controllers/product')
const subscriptionController = require('./controllers/subscription')
const mongoConnect = require('./libs/dbConnect')

const express = require('express')
const serverless = require('serverless-http')

const app = express()

app.use(express.json())

mongoConnect.connection()

app.get('/users', async (req, res) => {
  const dataResponse = await userController.getUsers(req)
  res.status(200).json(dataResponse)
})

app.get('/users/:id', async (req, res) => {
  const dataResponse = await userController.getUserById(req)
  res.status(200).json(dataResponse)
})

app.post('/users', async (req, res) => {
  const dataResponse = await userController.postUser(req)
  res.status(200).json(dataResponse)
})

app.get('/products', async (req, res) => {
  const dataResponse = await productController.getProducts(req)
  res.status(200).json(dataResponse)
})

app.get('/products/:id', async (req, res) => {
  const dataResponse = await productController.getProductById(req)
  res.status(200).json(dataResponse)
})

app.post('/products', async (req, res) => {
  const dataResponse = await productController.postProduct(req)
  res.status(200).json(dataResponse)
})

app.post('/subscription/user/:user/product/:product', async (req, res) => {
  const dataResponse = await subscriptionController.postSubscription(req)
  res.status(200).json(dataResponse)
})

// async function healthCheck (event, context, callback) {
//   console.log({event, context})
//   console.log('entrei')

//   console.log(process.env.MONGODB)

//   const response = {
//     statusCode: 200, 
//     body: JSON.stringify({status: 'OK'})
//   }
//   callback(null, response)
//   return response
// }

// module.exports = {
//   healthCheck,
//   users: userController,
//   products: productController
// }

module.exports.handler = serverless(app)


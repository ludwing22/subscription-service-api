const UserService = require('../../service/user')
const ProductService = require('../../service/product')
const SubscriptionService = require('../../service/subscription')

async function postSubscription (event) {
  const { user, product } = event.params

  const { recurrence } = event.body

  const userModel = UserService.getById(user)
  const productModel = ProductService.getById(product)

  if (!userModel || !productModel) throw new Error('Não foi possível encontrar os dados solicitados')

  try {
    const subscriptionModel = await SubscriptionService.createSubscription(userModel, product, recurrence)

    return subscriptionModel
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

async function scheduleConfirmPayments (event, context) {
  try {

    for (const pendingSubscription of await SubscriptionService.getPendingPayments()) {
      console.log(pendingSubscription)
      const confirm = await SubscriptionService.setConfirmPayment(pendingSubscription._id, pendingSubscription.payments._id)
      console.log(confirm)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  postSubscription,
  scheduleConfirmPayments
}
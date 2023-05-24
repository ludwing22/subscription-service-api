const { default: mongoose } = require('mongoose')
const add = require('date-fns/add')
const SubscriptionModel = require('../../model/subscription')

async function getSubscriptions (user) {
  const subscriptions = await SubscriptionModel.find({user: mongoose.Types.ObjectId(user)})
  return subscriptions
}

async function createSubscription (user, product, recurrence) {
  const payDay = getPayDay(recurrence)
  const currentPayment = {
    price: product.price,
    name: product.name,
    address: user.address,
    status: 'pending',
    payDay: new Date()
  }

  const nextPayment = {
    price: product.price,
    name: product.name,
    address: user.address,
    status: 'pending',
    payDay: payDay
  }

  const subscriptionModel = {
    user: user._id,
    product: product._id,
    recurrence,
    status: 'pending',
    payments: [
      currentPayment,
      nextPayment
    ]
  }
  const subscriptionResponse = await SubscriptionModel(subscriptionModel).save()
  return subscriptionResponse
}

async function getPendingPayments () {
  const initial = new Date()

  const payments = SubscriptionModel.aggregate([
    {
      $match: {
        'payments.payDay': {
          $lte: initial
        },
        status: {
          'payments.status': 'pending'
        }
      }
    },
    {
      $unwind: 'payments'
    }
  ])

  return payments
}

async function setConfirmPayment (subscription, payment) {
  const update = {
    $set: {
      'payment.status': 'confirm'
    }
  }
  const filter = {
    _id: subscription,
    'payments.$._id': payment
  }

  const result = await SubscriptionModel.updateOne(filter, update)
  return result
}

async function getPayDay (recurrence) {
  const now = new Date()
  const payDayByRecurrence = {
    monthly: (date) => add(date, {months: 1}),
    weekly: (date) => add(date, {weeks: 1}),
    yearly: (date) => add(date, {years: 1})
  }

  const fn = payDayByRecurrence[recurrence]
  return fn(now)
}

module.exports = {
  getSubscriptions,
  createSubscription,
  getPendingPayments,
  setConfirmPayment
}
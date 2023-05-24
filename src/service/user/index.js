const UserModel = require('../../model/user')

async function create (user) {
  try {
    const userResponse = await UserModel(user).save()

    return userResponse
  } catch (error) {
    console.log(error)
  }
}

async function get () {
  try {
    const usersResponse = await UserModel.find({})

    return usersResponse
  } catch (error) {
    console.log(error)
  }
}

async function getById (_id) {
  try {
    const usersResponse = await UserModel.findById(_id)

    return usersResponse
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  create,
  get,
  getById
}
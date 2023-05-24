const UserService = require('../../service/user')
const { response, successResponse } = require('../../libs/buildResponse')

async function getUsers (event) {
  console.log('user connect')
  console.log(event.params)
  console.log(event.body)

  try {
    const users = await UserService.get()
    console.log(users)
    return users
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

async function getUserById (event) {
  const { _id } = event.params

  try {
    const user = await UserService.getById(_id)
    if (user) return users
    throw new Error('Usuário não encontrado')
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

async function postUser (event) {
  const userBody = event.body

  try {
    const user = await UserService.create(userBody)
    return user
  } catch (err) {
    console.log(err)
    return JSON.stringify(err)
  }
}

module.exports = {
  getUsers,
  getUserById,
  postUser
}
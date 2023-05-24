const mongoose = require('mongoose')

let conn = null

async function connection () {
  if (conn == null) {
    try {
      console.log('try connect => ', process.env.MONGODB)
      conn = mongoose.connect(process.env.MONGODB, {
        serverSelectionTimeoutMS: 5000
      })
  
      await conn
      console.log('end Connect')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  connection
}
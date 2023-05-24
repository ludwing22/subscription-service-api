module.exports.response = (body, statusCode, callback) => {
  callback(null, {
    body: JSON.stringify(body),
    statusCode
  })
}

module.exports.successResponse = (body) => ({
  body: JSON.stringify(body),
  statusCode: 200
})

module.exports.errorResponse = (body) => ({
  body: JSON.stringify(body),
  statusCode: 400
})
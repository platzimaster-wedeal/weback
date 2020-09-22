'use strict'

const config = require('../config')

function success (req, res, message = 'Done', status = 200) {
  res.status(status).send({
    error: false,
    status: status,
    body: message
  })
}

function error (req, res, message = 'Internal Server Error', status = 500, details) {
  if (config.api.env === 'development') {
    console.error(details)
  }

  res.status(status).send({
    error: true,
    status: status,
    body: message
  })
}

module.exports = {
  success,
  error
}

'use strict'

const response = require('./response')

function errors (e, req, res, next) {
  response.error(req, res, e.message, e.statusCode, e)
}

module.exports = errors

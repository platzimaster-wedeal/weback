'use strict'

const auth = require('../../../auth')

module.exports = function checkAuth (action) {
  function middleWare (req, res, next) {
    switch (action) {
      case 'update':
      case 'remove': {
        /* const owner = req.params.id
        auth.check.own(req, owner) */
        next()
        break
      }
      case 'list':
      case 'get':
        auth.check.logged(req)
        next()
        break
      default:
        next()
        break
    }
  }

  return middleWare
}

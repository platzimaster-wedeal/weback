'use strict'

const auth = require('../../../auth')

module.exports = function checkAuth (action) {
  function middleWare (req, res, next) {
    switch (action) {
      case 'update':
      case 'delete': {
        const owner = req.body.id
        auth.check.own(req, owner)
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

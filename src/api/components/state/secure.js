'use strict'

const auth = require('../../../auth')

module.exports = function checkAuth (action) {
  function middleWare (req, res, next) {
    switch (action) {
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

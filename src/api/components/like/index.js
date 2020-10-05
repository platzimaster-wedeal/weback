'user strict'

const controller = require('./controller')

const LikesService = require('../../../services/likes')

module.exports = controller(new LikesService())

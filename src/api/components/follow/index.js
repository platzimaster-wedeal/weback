'user strict'

const controller = require('./controller')

const FollowService = require('../../../services/follows')

module.exports = controller(new FollowService())

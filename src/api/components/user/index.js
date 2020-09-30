'user strict'

const controller = require('./controller')

const UsersService = require('../../../services/users')
const AuthsService = require('../../../services/auths')

module.exports = controller(new UsersService(), new AuthsService())

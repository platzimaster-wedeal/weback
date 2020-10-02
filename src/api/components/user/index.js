'user strict'

const controller = require('./controller')

const UsersService = require('../../../services/users')
const AuthsService = require('../../../services/auths')
const FilesService = require('../../../services/files')

module.exports = controller(new UsersService(), new AuthsService(), new FilesService())

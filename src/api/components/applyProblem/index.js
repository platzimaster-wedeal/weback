'user strict'

const controller = require('./controller')

const AuthsService = require('../../../services/auths')
const ApplyToProblme = require('../../../services/applyProblems')

module.exports = controller(new ApplyToProblme(), new AuthsService())

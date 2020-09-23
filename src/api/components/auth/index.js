'use strict'

const controller = require('./controller')

const AuthsService = require('../../../services/auths')

module.exports = controller(new AuthsService())

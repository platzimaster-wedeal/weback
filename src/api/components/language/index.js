'user strict'

const controller = require('./controller')

const LanguagesService = require('../../../services/languages')

module.exports = controller(new LanguagesService())

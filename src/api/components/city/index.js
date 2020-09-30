'user strict'

const controller = require('./controller')

const CitiesService = require('../../../services/cities')

module.exports = controller(new CitiesService())

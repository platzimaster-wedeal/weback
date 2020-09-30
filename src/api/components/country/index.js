'user strict'

const controller = require('./controller')

const CountriesService = require('../../../services/countries')

module.exports = controller(new CountriesService())

'user strict'

const controller = require('./controller')

const StatesService = require('../../../services/states')

module.exports = controller(new StatesService())

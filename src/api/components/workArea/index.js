'user strict'

const controller = require('./controller')

const WorkAreasService = require('../../../services/workAreas')

module.exports = controller(new WorkAreasService())

'user strict'

const controller = require('./controller')

const GradeService = require('../../../services/grades')

module.exports = controller(new GradeService())

'user strict'

const controller = require('./controller')

const ProblemService = require('../../../services/problems')
const FilesService = require('../../../services/files')

module.exports = controller(new ProblemService(),  new FilesService())

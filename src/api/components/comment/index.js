'user strict'

const controller = require('./controller')

const CommentsService = require('../../../services/comments')
const FilesService = require('../../../services/files')

module.exports = controller(new CommentsService(), FilesService)

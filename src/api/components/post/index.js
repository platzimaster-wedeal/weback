'user strict'

const controller = require('./controller')

const PostsService = require('../../../services/posts')
const FilesService = require('../../../services/files')

module.exports = controller(new PostsService(), new FilesService())

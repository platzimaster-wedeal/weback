'use strict'

const { param } = require('./network')

module.exports = (commentService, filesService) => {
  async function getComment (params) {
    return commentService.getComment(params)
  }

  async function getCommentsPost (params) {
    return commentService.getCommentsPost(params)
  }

  async function insert (body) {
    return commentService.insert(body)
  }

  async function remove (params) {
    return commentService.remove(params)
  }

  return {
    getComment,
    getCommentsPost,
    insert,
    remove
  }
}

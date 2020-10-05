'use strict'

module.exports = (likesService) => {
  async function list (params) {
    return likesService.list(params)
  }

  async function insert (params) {
    return likesService.insert(params)
  }

  async function remove (params) {
    return likesService.remove(params)
  }

  return {
    list,
    insert,
    remove
  }
}

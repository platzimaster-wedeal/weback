'use strict'

module.exports = (languagesService) => {
  async function list (params) {
    return languagesService.list(params)
  }

  async function get (params) {
    return languagesService.get(params)
  }

  return {
    list,
    get
  }
}

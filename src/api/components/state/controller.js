'use strict'

module.exports = (statesService) => {
  async function list (params) {
    return statesService.list(params)
  }

  async function get (params) {
    return statesService.get(params)
  }

  return {
    list,
    get
  }
}

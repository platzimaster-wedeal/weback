'use strict'

module.exports = (workAreasService) => {
  async function list (params) {
    return workAreasService.list(params)
  }

  async function get (params) {
    return workAreasService.get(params)
  }

  return {
    list,
    get
  }
}

'use strict'

module.exports = (citiesService) => {
  async function list (params) {
    return citiesService.list(params)
  }

  async function get (params) {
    return citiesService.get(params)
  }

  return {
    list,
    get
  }
}

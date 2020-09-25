'use strict'

module.exports = (countriesService) => {
  async function list () {
    return countriesService.list()
  }

  async function get (id) {
    return countriesService.get({ id })
  }

  return {
    list,
    get
  }
}

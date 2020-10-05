'use strict'

module.exports = (gradeService) => {
  async function get (params) {
    const avg = gradeService.get(params)

    if (avg === 0) {
      return { message: 'The user must be graded' }
    }

    return avg
  }

  async function insert (body) {
    return await gradeService.insert(body)
  }

  return {
    get,
    insert
  }
}

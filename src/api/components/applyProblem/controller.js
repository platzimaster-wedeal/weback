'use strict'

module.exports = (applyToProblem, authsService) => {
  async function list () {
    return applyToProblem.list()
  }

  async function get (id) {
    const params = {
      id_applyProblem: id
    }

    return applyToProblem.get(params)
  }

  async function insert (body) {

    body = {
      ...body
    }
    const recordset = await applyToProblem.insert(body)

    return recordset
  }
  async function update (id, body) {
    
    body = {
      ...body
    }
    return await applyToProblem.update(id, body)
  }
  async function remove (id) {
    const params = {
      id_applyProblem: id
    }
    const recordset = await authsService.remove(params)
    if (recordset.count > 0) {
      await applyToProblem.remove(params)
    }
    return recordset
  }

  return {
    list,
    get,
    insert,
    update,
    remove
  }
}

'use strict'

module.exports = (problemService, filesService) => {
  async function list () {
    return problemService.list()
  }

  async function get (id) {
    const params = {
      id_problem: id
    }

    return problemService.get(params)
  }

  async function insert (body, { myFile }) {
    const dataMyFile = await filesService.uploadFiles(myFile)

    console.log(dataMyFile)
    body = {
      ...body,
      file_url: dataMyFile[0].secure_url
    }

    const recordset = await problemService.insert(body)

    return recordset
  }
  async function update (id, body, { myFile, myAvatar }) {
    const dataMyFile = await filesService.uploadFiles(myFile)

    body = {
      ...body,
      file_url: dataMyFile[0].secure_url
    }
    return await problemService.update(id, body)
  }
  async function remove (id) {
    const params = {
      id_problem: id
    }
    const recordset = await problemService.remove(params)
    /* if (recordset.count > 0) {
      await problemService.remove(params)
    } */
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

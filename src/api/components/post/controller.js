'use strict'

module.exports = (postsService, filesService) => {
  async function list () {
    return postsService.list()
  }

  async function get (params) {
    return postsService.get(params)
  }

  async function insert (body, { myFile }) {
    const dataMyFile = await filesService.uploadFiles(myFile)

    body = {
      ...body,
      file_url: dataMyFile[0].secure_url
    }

    console.log(body)
    return await postsService.insert(body)
  }

  return {
    list,
    get,
    insert
  }
}

'use strict'

module.exports = (postsService, filesService) => {
  async function list () {
    return postsService.list()
  }

  async function get (params) {
    return postsService.get(params)
  }

  async function insert (body, file) {
    const result = await filesService.uploadFile(file)

    if (result) {
      body = {
        ...body,
        file_url: result.fileUrl
      }
    }

    return await postsService.insert(body)
  }

  return {
    list,
    get,
    insert
  }
}

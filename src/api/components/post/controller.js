'use strict'

module.exports = (postsService, filesService) => {
  async function list () {
    return postsService.list()
  }

  async function get (params) {
    return postsService.get(params)
  }

  async function insert (body, { myFile, myAvatar }) {
    const paths = [!myFile ? '' : myFile[0].path]
    const result = await filesService.uploadFile(paths)

    if (result) {
      body = {
        ...body,
        file_url: result.myFile
      }
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

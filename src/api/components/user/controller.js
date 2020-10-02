'use strict'

const encrypter = require('../../../utils/encrypter')

module.exports = (usersService, authsService, filesService) => {
  async function list () {
    return usersService.list()
  }

  async function get (id) {
    const params = {
      id_user: id
    }

    return usersService.get(params)
  }

  async function insert (body, {path}) {
    const { secure_url } = await filesService.uploadFile(path);

    body = {
      ...body,
      file_url: secure_url
    };

    const recordset = await usersService.insert(body)

    if (recordset.id_user) {
      const encryptedPwd = await encrypter.hash(body.password)
      const authData = {
        id_user: recordset.id_user,
        username: body.username,
        password: encryptedPwd
      }

      await authsService.insert(authData)
    }

    return recordset
  }

  async function update (id, body, {path}) {
    const { secure_url } = await filesService.uploadFile(path);
    body = {
      ...body,
      file_url: secure_url
    };
    return await usersService.update(id, body)
  }

  async function remove (id) {
    const params = {
      id_user: id
    }
    const recordset = await authsService.remove(params)
    if (recordset.count > 0) {
      await usersService.remove(params)
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

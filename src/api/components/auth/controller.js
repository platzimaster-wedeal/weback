'use strict'

const auth = require('../../../auth')
const encrypter = require('../../../utils/encrypter')
const error = require('../../../utils/error')

module.exports = (authsService) => {
  async function login (body) {
    const { password } = body

    const recordset = await authsService.get(body)
    const areEquals = await encrypter.compare(password, recordset.password)

    if (!areEquals) {
      throw error('Invalid information', 401)
    }
    const result = {
      id_user: recordset.id_user,
      id_user_employee: recordset.id_user_employee,
      token_user: auth.sign(recordset)

    }
    return result
  }

  async function insert ({ id_user, username, password }) {
    const encryptedPwd = await encrypter.hash(password)
    return authsService.insert(id_user, username, encryptedPwd)
  }

  async function update ({ id_user, username, password }) {
    const encryptedPwd = await encrypter.hash(password)
    return authsService.update(id_user, username, encryptedPwd)
  }

  return {
    login,
    insert,
    update
  }
}

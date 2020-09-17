'use strict'

const bcrypt = require('bcrypt')

const auth = require('../../../auth')

const TABLE = 'auths'
const SALT_OF_ENCRYPTION = 7

module.exports = (store = require('../../../store/dummy')) => {
  async function login (username, password) {
    const data = await store.query(TABLE, { username: username })

    const areEquals = await bcrypt.compare(password, data.password)

    if (!areEquals) {
      throw new Error('Invalid information')
    }

    return auth.sign(data)
  }

  async function upsert (user) {
    const authData = {
      id: user.id
    }

    if (user.username) {
      authData.username = user.username
    }

    if (user.password) {
      authData.password = await bcrypt.hash(user.password, SALT_OF_ENCRYPTION)
    }

    return store.upsert(TABLE, authData)
  }

  return {
    login,
    upsert
  }
}

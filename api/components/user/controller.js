'use strict'

const { nanoid } = require('nanoid')

const auth = require('../auth')

const TABLE = 'users'

module.exports = (store = require('../../../store/dummy')) => {
  async function list () {
    return store.list(TABLE)
  }

  async function get (id) {
    return store.get(TABLE, id)
  }

  async function upsert (body) {
    const user = {
      id: '',
      name: body.name,
      username: body.username,
      password: body.password
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    if (body.password && body.username) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password
      })
    }

    return store.upsert(TABLE, user)
  }

  async function remove (id) {
    return store.remove(TABLE, id)
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}

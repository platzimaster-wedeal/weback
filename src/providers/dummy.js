'use strict'

const config = require('../config')

const db = {
  users: [
    { id: '1', name: 'Rubén' },
    { id: '2', name: 'Brayan' },
    { id: '3', name: 'Juan' },
    { id: '4', name: 'Julio' }
  ],
  auths: []
}

const findIndexById = (table, { id }) => db[table].findIndex(item => item.id === id)

async function list (table) {
  return db[table]
}

async function get (table, id) {
  const cols = await list(table)
  const user = cols.find(item => item.id === id) || ''

  return user
}

async function upsert (table, data) {
  let inserted = true
  const index = findIndexById(table, data)

  if (~index) {
    db[table][index] = data
    inserted = false
  } else {
    db[table].push(data)
  }

  if (config.api.env === 'development') {
    console.table('upsert', db[table])
  }

  return {
    data,
    inserted
  }
}

async function remove (table, id) {
  const index = findIndexById(table, id)

  if (!~index) {
    db[table].splice(index, 1)
  }

  return true
}

async function query (table, q) {
  const col = await list(table)
  const keys = Object.keys(q)
  const key = keys[0]

  return col.find(item => item[key] === q[key]) || null
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}

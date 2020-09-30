'use strict'

const bcrypt = require('bcrypt')

const SALT_OF_ENCRYPTION = 10

async function hash (data) {
  return bcrypt.hash(data, SALT_OF_ENCRYPTION)
}

async function compare (data, encryptedData) {
  return bcrypt.compare(data, encryptedData)
}

module.exports = {
  hash,
  compare
}

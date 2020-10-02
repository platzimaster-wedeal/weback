'use strict'

const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const {
  PORT,
  NODE_ENV,
  SECRET_PHRASE,
  MSSQL_SERVER,
  MSSQL_PORT,
  MSSQL_USER,
  MSSQL_PASSWORD,
  MSSQL_DATABASE,
  MSSQL_OPTIONS_ENCRYPTED,
  MSSQL_OPTIONS_ENABLE_ARITH_ABORT
} = process.env

assert(PORT, 'POST is required')
assert(NODE_ENV, 'NODE_ENV is required')

module.exports = {
  api: {
    port: PORT,
    env: NODE_ENV
  },
  jwt: {
    secret: SECRET_PHRASE
  },
  mssql: {
    server: MSSQL_SERVER,
    port: Number(MSSQL_PORT),
    user: MSSQL_USER,
    password: MSSQL_PASSWORD,
    database: MSSQL_DATABASE,
    options: {
      encrypted: MSSQL_OPTIONS_ENCRYPTED,
      enableArithAbort: Boolean(MSSQL_OPTIONS_ENABLE_ARITH_ABORT)
    }
  }
}

'use strict'

module.exports = {
  api: {
    port: process.env.PORT,
    env: process.env.NODE_ENV
  },
  jwt: {
    secret: process.env.SECRET_PHRASE
  }
}

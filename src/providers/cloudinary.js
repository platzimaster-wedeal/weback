'use strict'

const sql = require('mssql')

const config = require('../config')
const error = require('../utils/error')

const dbConfig = {
  server: config.mssql.server,
  port: config.mssql.port,
  user: config.mssql.user,
  password: config.mssql.password,
  database: config.mssql.database,
  options: config.mssql.options
}

class CloudinaryProvider {
  constructor () {
  }

  async uploadFile ({ file }) {
    return {
      fileUrl: 'https://imgurl.me/images/2020/09/11/profilededaultbb7053428141edf1.png'
    }
  }
};

module.exports = new CloudinaryProvider()

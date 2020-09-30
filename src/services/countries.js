'use strict'

class CountriesService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list () {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    const { recordset } = await request.query(
      `
        SELECT *
        FROM countries WITH (NOLOCK)
      `
    )
    return recordset || []
  }

  async get ({ id }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id', id)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM countries WITH (NOLOCK)
        WHERE id = @id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = CountriesService

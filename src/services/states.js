'use strict'

class StatesService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list ({ id_country }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_country', id_country)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM states WITH (NOLOCK)
        WHERE id_country = @id_country
      `
    )
    return recordset || []
  }

  async get ({ id_country, id }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_country', id_country)
    request.input('id', id)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM states WITH (NOLOCK)
        WHERE id_country = @id_country AND id = @id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = StatesService

'use strict'

class CitiesService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list ({ id_state }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_state', id_state)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM cities WITH (NOLOCK)
        WHERE id_state = @id_state
      `
    )
    return recordset || []
  }

  async get ({ id_state, id }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_state', id_state)
    request.input('id', id)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM cities WITH (NOLOCK)
        WHERE id_state = @id_state AND id = @id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = CitiesService

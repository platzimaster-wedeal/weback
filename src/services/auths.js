'use strict'

class AuthsService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async get ({ username }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('username', username)
    const { recordset } = await request.query(
      `
        SELECT id_user, username, password
        FROM auths WITH (NOLOCK)
        WHERE username = @username
      `
    )
    return recordset[0] || {}
  }

  async insert ({ id_user, username, password }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('username', username)
    request.input('password', password)
    const { recordset } = await request.query(
      `
        INSERT INTO auths
        (
          id_user,
          username,
          password
        )
        VALUES
        (
          @id_user,
          @username,
          @password
        )

        SELECT @@ROWCOUNT AS [count]
      `
    )
    return recordset[0] || {}
  }

  async update ({ id_user, username, password }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('username', username)
    request.input('password', password)
    const { recordset } = await request.query(
      `
        UPDATE auths
        SET username = @username,
            password = @password
        WHERE id_user = @id_user

        SELECT @@ROWCOUNT AS [count]
      `
    )
    return recordset[0] || {}
  }

  async remove ({ id_user }) {
    try {
      const cnx = await this.provider.getConnection()
      const request = await cnx.request()
      request.input('id_user', id_user)
      const { recordset } = await request.query(
        `
          DELETE FROM auths
          WHERE id_user = @id_user

          SELECT @@ROWCOUNT AS [count]
        `
      )
      return recordset[0] || {}
    } catch (error) {
      console.log('Error seguramente en el controller', error)
      return 'Internal Server Error'
    }
  }
}

module.exports = AuthsService

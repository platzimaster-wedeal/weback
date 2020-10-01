'use strict'

class UsersService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list () {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    const { recordset } = await request.query(
      `
        SELECT *
        FROM users WITH (NOLOCK)
      `
    )
    return recordset || []
  }

  async get ({ id_user }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM users WITH (NOLOCK)
        WHERE id = @id_user
      `
    )
    console.log(recordset)
    return recordset[0] || {}
  }

  async insert ({
    first_name,
    last_name,
    email,
    date_of_birth,
    telephone,
    id_city,
    nationality,
    description,
    id_work_area
  }) {
    console.log(new Date(date_of_birth))
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('date_of_birth', new Date(date_of_birth))
    request.input('telephone', telephone)
    request.input('id_city', id_city)
    request.input('nationality', nationality)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    const { recordset } = await request.query(
      `
        INSERT INTO users
        (
          first_name,
          last_name,
          email,
          date_of_birth,
          telephone,
          id_city,
          nationality,
          description,
          id_work_area
        )
        VALUES
        (
          @first_name,
          @last_name,
          @email,
          @date_of_birth,
          @telephone,
          @id_city,
          @nationality,
          @description,
          @id_work_area
        )

        SELECT SCOPE_IDENTITY() AS id_user
      `
    )
    return recordset[0] || {}
  }

  async update (id_user, {
    first_name,
    last_name,
    email,
    telephone,
    id_city,
    nationality,
    description,
    id_work_area
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('telephone', telephone)
    request.input('id_city', id_city)
    request.input('nationality', nationality)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    const { recordset } = await request.query(
      `
        UPDATE users
        SET first_name       = @first_name,
            last_name        = @last_name,
            email            = @email,
            telephone        = @telephone,
            id_city          = @id_city,
            nationality      = @nationality,
            description      = @description,
            id_work_area     = @id_work_area
        WHERE id = @id_user
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
          DELETE FROM users
          WHERE id = @id_user
          SELECT @@ROWCOUNT AS [count]
        `
      )
      return recordset[0] || {}
    } catch (error) {
      console.log('Error seguramente en el controller', error)
      return false
    }
  }
}

module.exports = UsersService

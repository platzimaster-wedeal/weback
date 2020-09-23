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
        WHERE id_user = @id_user
      `
    )
    return recordset[0] || {}
  }

  async insert ({
    first_name,
    last_name,
    email,
    telephone,
    id_city,
    nationality,
    description,
    profile_image,
    id_work_area,
    work_experience,
    skills,
    education
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('telephone', telephone)
    request.input('id_city', id_city)
    request.input('nationality', nationality)
    request.input('description', description)
    request.input('profile_image', profile_image)
    request.input('id_work_area', id_work_area)
    request.input('work_experience', work_experience)
    request.input('skills', skills)
    request.input('education', education)
    const { recordset } = await request.query(
      `
        INSERT INTO users
        (
          first_name,
          last_name,
          email,
          telephone,
          id_city,
          nationality,
          description,
          profile_image,
          id_work_area,
          work_experience,
          skills,
          education
        )
        VALUES
        (
          @first_name,
          @last_name,
          @email,
          @telephone,
          @id_city,
          @nationality,
          @description,
          @profile_image,
          @id_work_area,
          @work_experience,
          @skills,
          @education
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
    profile_image,
    id_work_area,
    work_experience,
    skills,
    education
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
    request.input('profile_image', profile_image)
    request.input('id_work_area', id_work_area)
    request.input('work_experience', work_experience)
    request.input('skills', skills)
    request.input('education', education)
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
            profile_image    = @profile_image,
            id_work_area     = @id_work_area,
            work_experience  = @work_experience,
            skills           = @skills,
            education        = @education
        WHERE id_user = @id_user

        SELECT @@ROWCOUNT AS [count]
      `
    )
    return recordset[0] || {}
  }

  async remove ({ id_user }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    const { recordset } = await request.query(
      `
        DELETE FROM users
        WHERE id_user = @id_user

        SELECT @@ROWCOUNT AS [count]
      `
    )
    return recordset[0] || {}
  }
}

module.exports = UsersService

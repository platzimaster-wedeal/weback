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
    description,
    id_work_area,
    employee,
    employeer,
    id_language,
    file_url,
    degree_title,
    degree_description,
    last_job_title,
    myAvatar
    // TODO: FALTA EL CAMPO DEL AVATAR
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('date_of_birth', new Date(date_of_birth))
    request.input('telephone', telephone)
    request.input('id_city', id_city)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    request.input('employee', employee)
    request.input('employeer', employeer)
    request.input('id_language', id_language)
    request.input('file_url', file_url)
    request.input('degree_title', degree_title)
    request.input('degree_description', degree_description)
    request.input('last_job_title', last_job_title)
    request.input('avatar', myAvatar)
    const { recordset } = await request.query(
      `
        DECLARE @id_user INT = 0;
        DECLARE @id_employer INT = 0;
        DECLARE @id_employee INT = 0;

        INSERT INTO users
        (
          first_name,
          last_name,
          email,
          date_of_birth,
          telephone,
          id_city,
          description,
          id_work_area,
          employee,
          employeer,
          avatar
          
        )
        VALUES
        (
          @first_name,
          @last_name,
          @email,
          @date_of_birth,
          @telephone,
          @id_city,
          @description,
          @id_work_area,
          @employee,
          @employeer,
          @avatar
          
        )

        SET @id_user = IDENT_CURRENT('users')

        INSERT INTO users_languages (id_user, id_language)
        VALUES(@id_user, @id_language)

        INSERT INTO employers (id_user)
        VALUES (@id_user)

        SET @id_employer = IDENT_CURRENT('employers')

        INSERT INTO employees (id_user, id_work_area, last_job_title)
        VALUES (@id_user, @id_work_area, @last_job_title)

        SET @id_employee = IDENT_CURRENT('employees');

        INSERT INTO experiences (degree, file_url, description, id_employee)
        VALUES(@degree_title, @file_url, @degree_description, @id_employee)

        SELECT @id_user AS id_user
      `
    )
    return recordset[0] || {}
  }

  async update (id_user, {
    first_name,
    last_name,
    email,
    date_of_birth,
    telephone,
    id_city,
    description,
    id_work_area,
    employee,
    employeer,
    myAvatar,
    id_language,
    file_url,
    degree_title,
    degree_description,
    last_job_title
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('date_of_birth', new Date(date_of_birth))
    request.input('telephone', telephone)
    request.input('id_city', id_city)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    request.input('employee', employee)
    request.input('employeer', employeer)
    request.input('avatar', myAvatar)
    request.input('id_language', id_language)
    request.input('file_url', file_url)
    request.input('degree_title', degree_title)
    request.input('degree_description', degree_description)
    request.input('last_job_title', last_job_title)
    const { recordset } = await request.query(
      `
        DECLARE @id_employee INT = 0;

        UPDATE users
        SET first_name       = @first_name,
            last_name        = @last_name,
            email            = @email,
            telephone        = @telephone,
            id_city          = @id_city,
            description      = @description,
            id_work_area     = @id_work_area,
            employee         = @employee,
            employeer        = @employeer,
            avatar           = @avatar
        WHERE id = @id_user

        UPDATE users_languages
        SET id_language       = @id_language
        WHERE id_user         = @id_user

        UPDATE employees
        SET id_work_area      = @id_work_area,
            last_job_title    = @last_job_title
        WHERE id_user         = @id_user

        SELECT TOP (1) @id_employee = id FROM employees WHERE id_user = @id_user

        UPDATE experiences
        SET degree          = @degree_title,
            file_url        = @file_url,
            description     = @degree_description
        WHERE id_employee   = @id_employee


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

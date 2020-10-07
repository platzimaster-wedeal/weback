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
        SELECT  a.id AS id_user,
                a.first_name,
                a.last_name,
                b.username,
                a.email,
                a.avatar,
                a.date_of_birth,
                a.telephone,
                a.id_work_area,
                e.title,
                a.employee,
                a.employeer,
                c.id AS id_employee,
                e.id AS id_employer,
                a.latitude,
                a.longitude,
                a.description,
        (SELECT ISNULL(AVG(qualification), 0) 
        FROM scores WITH (NOLOCK)
        WHERE id_employee = c.id) AS qualification_average
        FROM [users] AS a WITH (NOLOCK)
        INNER JOIN [auths] AS b WITH (NOLOCK) ON (a.id = b.id_user)
        INNER JOIN [employees] AS c WITH (NOLOCK) ON (b.id_user = c.id_user)
        INNER JOIN [employers] AS d WITH (NOLOCK) ON (c.id_user = d.id_user)
        INNER JOIN [work_areas] AS e WITH (NOLOCK) ON (a.id_work_area = e.id)
        WHERE a.id = 988
      `
    )
    return recordset[0] || {}
  }

  async insert ({
    first_name,
    last_name,
    email,
    date_of_birth,
    telephone,
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
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('date_of_birth', new Date(date_of_birth))
    request.input('telephone', telephone)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    request.input('employee', employee)
    request.input('employeer', employeer)
    request.input('id_language', id_language)
    request.input('file_url', file_url)
    request.input('degree_title', degree_title)
    request.input('degree_description', degree_description)
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

        INSERT INTO employees (id_user, id_work_area)
        VALUES (@id_user, @id_work_area)

        SET @id_employee = IDENT_CURRENT('employees');

        INSERT INTO experiences (degree, file_url, description, id_employee)
        VALUES(@degree_title, @file_url, @degree_description, @id_employee)

        SELECT @id_user AS id_user, @id_employee AS id_eployee, @id_employer AS id_epmloyer 
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
    description,
    id_work_area,
    employee,
    employeer,
    myAvatar,
    id_language,
    file_url,
    degree_title,
    degree_description
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('first_name', first_name)
    request.input('last_name', last_name)
    request.input('email', email)
    request.input('date_of_birth', new Date(date_of_birth))
    request.input('telephone', telephone)
    request.input('description', description)
    request.input('id_work_area', id_work_area)
    request.input('employee', employee)
    request.input('employeer', employeer)
    request.input('avatar', myAvatar)
    request.input('id_language', id_language)
    request.input('file_url', file_url)
    request.input('degree_title', degree_title)
    request.input('degree_description', degree_description)
    const { recordset } = await request.query(
      `
        DECLARE @id_employee INT = 0;

        UPDATE users
        SET first_name       = @first_name,
            last_name        = @last_name,
            email            = @email,
            telephone        = @telephone,
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
        SET id_work_area      = @id_work_area
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
  }

  async getPostulations({id_employee}) {
    const cnx =  await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employee', id_employee)
    const {recordset} = await request.query(

      `
      


      `


    )

    return recordset[0] || {}
  }
  async getProblems({id_employer}) {
    const cnx =  await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employer', id_employer)
    const {recordset} = await request.query(

      `
      
      SELECT  a.id_user,
              a.id AS id_employer,
              b.status,
              c.employer_name,
              c.modality,
              c.salary_range1,
              c.salary_range2,
              c.category,
              c.title,
              c.file_url,
              c.requeriments,
              c.long_description,
              c.short_description,
              c.schedule,
              c.created_at,
              c.guid
      FROM [employers] AS a WITH (NOLOCK)
      INNER JOIN [employers_job_offers] AS b WITH (NOLOCK) ON (a.id = b.id_employer)
      INNER JOIN [job_offers] AS c WITH (NOLOCK) ON (b.id_job_offer = c.id)
      WHERE a.id = @id_employer
      `
    )

    return recordset || {}
  }

}

module.exports = UsersService

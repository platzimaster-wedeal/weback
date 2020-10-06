'use strict'

class ProblemService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list () {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    const { recordset } = await request.query(
            `
              SELECT *
              FROM job_offers WITH (NOLOCK)
            `
    )
    return recordset || []
  }

  async get ({ id_problem }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_problem', id_problem)
    const { recordset } = await request.query(
            `
            SELECT * 
            FROM job_offers WITH (NOLOCK)
            WHERE id = @id_problem

            `
    )
    return recordset[0] || {}
  }

  async insert ({
    id_employer,
    title,
    employer_name,
    requeriments,
    modality,
    salary_range1,
    salary_range2,
    short_description,
    long_description,
    file_url,
    category,
    schedule

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employer', id_employer)
    request.input('title', title)
    request.input('employer_name', employer_name)
    request.input('requeriments', requeriments)
    request.input('modality', modality)
    request.input('salary_range1', salary_range1)
    request.input('salary_range2', salary_range2)
    request.input('short_description', short_description)
    request.input('long_description', long_description)
    request.input('file_url', file_url)
    request.input('category', category)
    request.input('schedule', new Date(schedule))
    const { recordset } = await request.query(
            `
            DECLARE @id_problem INT = 0;
            DECLARE @id_employer_job_offer INT = 0;

            INSERT INTO job_offers
            (
                title,
                employer_name,
                requeriments,
                modality,
                salary_range1,
                salary_range2,
                short_description,
                long_description,
                file_url,
                category,
                schedule
            )
            VALUES
            (
                @title,
                @employer_name,
                @requeriments,
                @modality,
                @salary_range1,
                @salary_range2,
                @short_description,
                @long_description,
                @file_url,
                @category,
                @schedule
            )

            SET @id_problem = IDENT_CURRENT('job_offers')
            
            INSERT INTO employers_job_offers (id_job_offer, id_employer status)
            VALUES (@id_problem, @id_employer, 'available')
            
            SET @id_employer_job_offer = IDENT_CURRENT('employers_job_offers')

            SELECT @id_problem AS id_problem, @id_employer_job_offer AS id_employer_job_offer
            
            `
    )
    console.log(recordset)
    return recordset[0] || {}
  }

  async update (id_problem, {
    title,
    employer_name,
    requeriments,
    modality,
    salary_range1,
    salary_range2,
    short_description,
    long_description,
    file_url,
    category,
    schedule

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_problem', id_problem)
    request.input('title', title)
    request.input('employer_name', employer_name)
    request.input('requeriments', requeriments)
    request.input('modality', modality)
    request.input('salary_range1', salary_range1)
    request.input('salary_range2', salary_range2)
    request.input('short_description', short_description)
    request.input('long_description', long_description)
    request.input('file_url', file_url)
    request.input('category', category)
    request.input('schedule', new Date(schedule))
    const { recordset } = await request.query(
            `
            UPDATE job_offers
            SET title               = @title,
                employer_name       = @employer_name,
                requeriments        = @requeriments,
                modality            = @modality,
                salary_range1       = @salary_range1,
                salary_range2       = @salary_range2,
                short_description   = @short_description,
                long_description    = @long_description,
                file_url            = @file_url,
                category            = @category,
                schedule            = @schedule
            WHERE id = @id_problem

            SELECT @@ROWCOUNT AS [count]
            
            `
    )
    return recordset[0] || {}
  }

  async remove ({ id_problem }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_problem', id_problem)
    const { recordset } = await request.query(
            `
              DELETE FROM job_offers
              WHERE id = @id_problem
              SELECT @@ROWCOUNT AS [count]
            `
    )
    return recordset[0] || {}
  }
}

module.exports = ProblemService

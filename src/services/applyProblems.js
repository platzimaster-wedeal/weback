'use strict'

class ApplyToProblme {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list () {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    const { recordset } = await request.query(
                `
                  SELECT *
                  FROM postulations WITH (NOLOCK)
                `
    )
    return recordset || []
  }

  async get ({ id_applyProblem }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_applyProblem', id_applyProblem)
    const { recordset } = await request.query(
                `
                SELECT * 
                FROM postulations WITH (NOLOCK)
                WHERE id = @id_applyProblem
                `
    )
    return recordset[0] || {}
  }

  async insert ({
    id_employee,
    id_employer_job_offer,
    hired

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employee', id_employee)
    request.input('id_employer_job_offer', id_employer_job_offer)
    request.input('hired', hired)
    const { recordset } = await request.query(
                `
                INSERT INTO postulations
                (
                  id_employers_job_offer,
                  id_employee,
                  hired
                )
                VALUES
                (
                  @id_employer_job_offer,
                  @id_employee,
                  @hired
                )
                `
    )
    return recordset[0] || {}
  }

  async update (id_postulation, {
    id_employee,
    id_employer_job_offer,
    hired

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_postulation', id_postulation)
    request.input('id_employee', id_employee)
    request.input('id_employer_job_offer', id_employer_job_offer)
    request.input('hired', hired)
    const { recordset } = await request.query(
                `
                UPDATE postulations
                SET hired        = @hired,
                WHERE id = @id_postulation
    
                SELECT @@ROWCOUNT AS [count]
                `
    )
    return recordset[0] || {}
  }

  async remove ({ id_postulation }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_postulation', id_postulation)
    const { recordset } = await request.query(
                `
                  DELETE FROM postulations
                  WHERE id = @id_postulation
                  SELECT @@ROWCOUNT AS [count]
                `
    )
    return recordset[0] || {}
  }
}

module.exports = ApplyToProblme

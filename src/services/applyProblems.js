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
                  FROM employers_job_offers WITH (NOLOCK)
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
                FROM employers_job_offers WITH (NOLOCK)
                WHERE id = @id_applyProblem
                `
    )
    return recordset[0] || {}
  }

  async insert ({
    id_employer,
    id_job_offer,
    status,
    id_employer_job_offer

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employer', id_employer)
    request.input('id_job_offer', id_job_offer)
    request.input('status', status)
    request.input('id_employer_job_offer', id_employer_job_offer)
    const { recordset } = await request.query(
                `
                UPDATE employers_job_offers
                SET id_employer        = @id_employer,
                    id_job_offer       = @id_job_offer,
                    status             = @status
                WHERE id = @id_employer_job_offer
    
                SELECT @@ROWCOUNT AS [count]
                `
    )
    return recordset[0] || {}
  }

  async update (id_problem, {
    id_employer,
    id_job_offer,
    status,
    id_employer_job_offer

  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employer', id_employer)
    request.input('id_job_offer', id_job_offer)
    request.input('status', status)
    request.input('id_employer_job_offer', id_employer_job_offer)
    const { recordset } = await request.query(
                `
                UPDATE employers_job_offers
                SET id_employer        = @id_employer,
                    id_job_offer       = @id_job_offer
                WHERE id = @id_employer_job_offer
    
                SELECT @@ROWCOUNT AS [count]
                `
    )
    return recordset[0] || {}
  }

  async remove ({ id_problem }) {
    try {
      const cnx = await this.provider.getConnection()
      const request = await cnx.request()
      request.input('id_problem', id_problem)
      const { recordset } = await request.query(
                `
                  DELETE FROM employers_job_offers
                  WHERE id = @id_problem
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

module.exports = ApplyToProblme

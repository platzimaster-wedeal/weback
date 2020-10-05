class GradeService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async get ({ id_employee }) {
    console.log(id_employee)
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employee', id_employee)
    const { recordset } = await request.query(
      `
        SELECT ISNULL(AVG(qualification), 0) AS qualification_average
        FROM scores WITH (NOLOCK)
        WHERE id_employee = @id_employee
      `
    )
    return recordset[0] || {}
  }

  async insert ({ id_employer, id_employee, comment, qualification }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_employer', id_employer)
    request.input('id_employee', id_employee)
    request.input('comment', comment)
    request.input('qualification', qualification)
    const { recordset } = await request.query(
      `
        INSERT INTO scores
            (
            id_employer,
            id_employee,
            comment,
            qualification
            )
        VALUES
            (
            @id_employer,
            @id_employee,
            @comment,
            @qualification
            )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = GradeService

'use strict'

class CommentsService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async getComment ({ id }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id', id)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM comments WITH (NOLOCK)
        WHERE id = @id
      `
    )
    return recordset[0] || {}
  }

  async getCommentsPost ({ id_post }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_post', id_post)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM comments WITH (NOLOCK)
        WHERE id_post = @id_post
      `
    )
    return recordset || []
  }

  async insert ({
    content,
    // file_url,
    status,
    id_user,
    id_post
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('content', content)
    // request.input('file_url', file_url)
    request.input('status', status)
    request.input('id_user', id_user)
    request.input('id_post', id_post)
    const { recordset } = await request.query(
      `
        INSERT INTO comments
        (
          content,
          id_user,
          id_post
        )
        VALUES
        (
          @content,
          @id_user,
          @id_post
        )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }

  async remove ({ id }) {
    try {
      const cnx = await this.provider.getConnection()
      const request = await cnx.request()
      request.input('id', id)
      const { recordset } = await request.query(
        `
          DELETE FROM comments
          WHERE id = @id

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

module.exports = CommentsService

'use strict'

class PostsService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list () {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    const { recordset } = await request.query(
      `
        SELECT *
        FROM posts WITH (NOLOCK)
      `
    )
    return recordset || []
  }

  async get ({ id }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id', id)
    const { recordset } = await request.query(
      `
        SELECT *
        FROM posts WITH (NOLOCK)
        WHERE id = @id
      `
    )
    return recordset[0] || {}
  }

  async insert ({
    content,
    file_url,
    publication_date,
    status,
    id_user
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('content', content)
    request.input('file_url', file_url)
    request.input('publication_date', new Date(publication_date))
    request.input('status', status)
    request.input('id_user', id_user)
    const { recordset } = await request.query(
      `
        INSERT INTO posts
        (
          content,
          file_url,
          publication_date,
          id_user,
        )
        VALUES
        (
          @content,
          @file_url,
          @publication_date,
          @id_user
        )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = PostsService

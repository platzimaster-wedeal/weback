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
    status,
    id_user
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('content', content)
    request.input('file_url', file_url)
    request.input('status', status)
    request.input('id_user', id_user)
    const { recordset } = await request.query(
      `
        INSERT INTO posts
        (
          content,
          file_url,
          id_user,
          type_post
        )
        VALUES
        (
          @content,
          @file_url,
          @id_user,
          1
        )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }
}

module.exports = PostsService

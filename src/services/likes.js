'use strict'

class LikesService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async list ({ id_post }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_post', id_post)
    const { recordset } = await request.query(
      `
        SELECT COUNT(id) AS likes_of_post
        FROM user_likes WITH (NOLOCK)
        WHERE id_post = @id_post
      `
    )
    return recordset || []
  }

  async insert ({ id_user, id_post }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('id_post', id_post)
    const { recordset } = await request.query(
      `
        INSERT INTO user_likes
        (
          id_user,
          id_post
        )
        VALUES
        (
          @id_user,
          @id_post
        )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }

  async remove ({ id_user, id_post }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user', id_user)
    request.input('id_post', id_post)
    const { recordset } = await request.query(
      `
        DELETE
        FROM user_likes
        WHERE id_post = @id_post AND id_user = @id_user

        SELECT @@ROWCOUNT AS [count]
      `
    )
    return recordset[0] || {}
  }
}

module.exports = LikesService

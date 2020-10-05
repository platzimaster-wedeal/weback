'use strict'

class FollowService {
  constructor (provider = require('../providers/mssql')) {
    this.provider = provider
  }

  async getUserFollowers ({ id_user_to }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user_to', id_user_to)
    const { recordset } = await request.query(
      `
        SELECT COUNT(id_user_from) AS total_followers
        FROM dbo.user_follows 
        WHERE id_user_to = @id_user_to
      `
    )
    return recordset || []
  }

  async follow ({
    id_user_from,
    id_user_to
  }) {
    const cnx = await this.provider.getConnection()
    const request = await cnx.request()
    request.input('id_user_from', id_user_from)
    request.input('id_user_to', id_user_to)
    const { recordset } = await request.query(
      `
        
        INSERT INTO dbo.user_follows (
            id_user_from, 
            id_user_to
        )
        VALUES(
            @id_user_from, 
            @id_user_to
        )

        SELECT SCOPE_IDENTITY() AS id
      `
    )
    return recordset[0] || {}
  }

  async unFollow ({
    id_user_from,
    id_user_to
  }) {
    try {
      const cnx = await this.provider.getConnection()
      const request = await cnx.request()
      request.input('id_user_from', id_user_from)
      request.input('id_user_to', id_user_to)
      const { recordset } = await request.query(
        `
        DELETE FROM  dbo.user_follows
        WHERE id_user_from = @id_user_from
        AND id_user_to = @id_user_to

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

module.exports = FollowService

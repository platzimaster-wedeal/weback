"use strict";

class PostsService {
  constructor(provider = require("../providers/mssql")) {
    this.provider = provider;
  }

  async list() {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    const { recordset } = await request.query(
      `
        
      SELECT    A.id,
        A.title,
        A.content,
        A.file_url,
        A.type_post,
        A.status,
        B.id AS id_likes,
        B.content AS comment_content,
        B.status AS comment_status,
        B.publication_date AS comment_createdAt,
        A.publication_date , 
        D.id AS id_user,
        D.first_name AS user_firstname,
        D.avatar,
        (SELECT COUNT(id_post) FROM dbo.user_likes WHERE id_post = a.id) AS users_likes
FROM dbo.posts AS a WITH (NOLOCK)
INNER JOIN dbo.comments AS b WITH (NOLOCK) ON (a.id = b.id_post)
INNER JOIN dbo.user_likes AS c WITH (NOLOCK) ON (b.id_post = c.id_post)
INNER JOIN dbo.users AS d WITH (NOLOCK) ON (c.id_user = d.id)
GROUP BY a.id, a.title, a.file_url, a.content, a.type_post, a.status, b.id, b.content, b.status, b.publication_date, a.publication_date, d.id, d.first_name, d.avatar
ORDER BY A.id DESC
      `
    );
    return recordset || [];
  }

  async get({ id }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id", id);
    const { recordset } = await request.query(
      `
      SELECT 
             A.id,
             A.title,
             A.content,
             A.file_url,
             A.type_post,
             A.status,
             B.content AS comment_content,
             B.status AS comment_status,
             B.publication_date AS comment_createdAt,
             A.publication_date , COUNT (*) AS total_likes
      FROM posts AS A WITH (NOLOCK)
      INNER JOIN comments AS B ON(B.id_post = A.id)
      INNER JOIN user_likes AS C ON(C.id_post = A.id)
      WHERE A.id = 15
      GROUP BY A.id,
             A.title,
             A.content,
             A.file_url,
             A.type_post,
             A.status,
             B.content,
             B.status ,
             B.publication_date,
             A.publication_date
      `
    );
    return recordset || {};
  }

  async insert({ content, file_url, status, id_user }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("content", content);
    request.input("file_url", file_url);
    request.input("status", status);
    request.input("id_user", id_user);
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
    );
    return recordset[0] || {};
  }
}

module.exports = PostsService;

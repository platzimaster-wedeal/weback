"use strict";

class ProblemService {
  constructor(provider = require("../providers/mssql")) {
    this.provider = provider;
  }

  async list() {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    const { recordset } = await request.query(
      `
            SELECT TOP(60) A.id,
                   A.title,
                   A.short_description,
                   A.long_description,
                   A.modality,
                   A.salary_range1,
                   A.salary_range2,
                   A.category,
                   A.file_url,
                   A.requirements,
                   B.id AS id_employer_job_offer,
                   B.[status] AS employer_job_offer_status,
                   B.id_employer AS id_employer,
                   D.avatar AS user_avatar,
                   A.guid,
                   A.created_at,
                   D.id AS user_id,
                   D.first_name AS employer_name,
                   D.last_name AS employer_lastname
            FROM job_offers AS A WITH (NOLOCK)
            INNER JOIN employers_job_offers AS B WITH (NOLOCK) ON (A.id = B.id_job_offer)
            FULL OUTER JOIN employers AS C WITH (NOLOCK) ON (B.id_employer = C.id)
            INNER JOIN users AS D WITH (NOLOCK) ON (C.id_user = D.id)
            ORDER BY created_at DESC
            `
    );
    return recordset || [];
  }

  async get({ id_problem }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_problem", id_problem);
    const { recordset } = await request.query(
      `
            SELECT A.id,
                   A.title,
                   A.short_description,
                   A.long_description,
                   D.first_name AS employer_name,
                   D.last_name AS employer_lastname,
                   A.modality,
                   A.salary_range1,
                   A.salary_range2,
                   A.category,
                   A.file_url,
                   A.requirements,
                   B.id AS id_employer_job_offer,
                   B.[status] AS employer_job_offer_status,
                   B.id_employer AS id_employer,
                   D.avatar AS user_avatar,
                   A.guid,
                   A.created_at,
                   D.id AS id_user
            FROM job_offers AS A WITH (NOLOCK)
            INNER JOIN employers_job_offers AS B WITH (NOLOCK) ON (A.id = B.id_job_offer)
            INNER JOIN employers AS C WITH (NOLOCK) ON (B.id_employer = C.id)
            INNER JOIN users AS D WITH (NOLOCK) ON (C.id_user = D.id)
            WHERE A.id = @id_problem


            `
    );
    return recordset[0] || {};
  }

  async patch({ id_employer_jobOffer }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_employer_jobOffer", id_employer_jobOffer);
    const { recordset } = await request.query(
      `
      UPDATE employers_job_offers
      SET [status] = 0

      WHERE id = @id_employer_jobOffer
      SELECT @@ROWCOUNT AS [count]
      `
    );

    return recordset;
  }

  async getPostulatedEmployee({ id_problem }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_problem", id_problem);
    const { recordset } = await request.query(
      `
      SELECT A.id,
             A.title,
             A.short_description,
             A.long_description,
             D.first_name AS employer_name,
             D.last_name AS employer_lastname,
             A.modality,
             A.salary_range1,
             A.salary_range2,
             A.category,
             A.file_url,
             A.requirements,
             B.id AS id_employer_job_offer,
             B.[status] AS employer_job_offer_status,
             B.id_employer AS id_employer,
             D.avatar AS user_avatar,
             A.guid,
             A.created_at,
             D.id AS id_user,
             E.id_employee AS employee_postulated,
             G.first_name AS employee_firstname,
             G.last_name AS employee_lastname,
             G.avatar,
             G.id AS id_user_employee
      FROM job_offers AS A WITH (NOLOCK)
      INNER JOIN employers_job_offers AS B WITH (NOLOCK) ON (A.id = B.id_job_offer)
      INNER JOIN employers AS C WITH (NOLOCK) ON (B.id_employer = C.id)
      INNER JOIN users AS D WITH (NOLOCK) ON (C.id_user = D.id)
      INNER JOIN postulations AS E WITH (NOLOCK) ON (E.id_employers_job_offer = B.id)
      INNER JOIN employees AS F WITH(NOLOCK) ON (F.id = E.id_employee)
      INNER JOIN users AS G WITH(NOLOCK)ON (G.id = F.id_user)
      WHERE A.id = @id_problem
            `
    );
    console.log(recordset);
    return recordset || {};
  }

  async insert({
    id_employer,
    title,
    employer_name,
    requirements,
    modality,
    salary_range1,
    salary_range2,
    short_description,
    long_description,
    file_url,
    category,
    schedule,
  }) {
    console.log({
      id_employer,
      title,
      employer_name,
      requirements,
      modality,
      salary_range1,
      salary_range2,
      short_description,
      long_description,
      file_url,
      category,
      schedule,
    });
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_employer", id_employer);
    request.input("title", title);
    request.input("employer_name", employer_name);
    request.input("requirements", requirements);
    request.input("modality", modality);
    request.input("salary_range1", salary_range1);
    request.input("salary_range2", salary_range2);
    request.input("short_description", short_description);
    request.input("long_description", long_description);
    request.input("file_url", file_url);
    request.input("category", category);
    request.input("schedule", new Date(schedule));
    const { recordset } = await request.query(
      `
            DECLARE @id_problem INT = 0;
            DECLARE @id_employer_job_offer INT = 0;

            INSERT INTO job_offers
            (
                title,
                employer_name,
                requirements,
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
                @requirements,
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
            
            INSERT INTO employers_job_offers (id_job_offer, id_employer)
            VALUES (@id_problem, @id_employer)
            
            SET @id_employer_job_offer = IDENT_CURRENT('employers_job_offers')

            SELECT @id_problem AS id_problem, @id_employer_job_offer AS id_employer_job_offer
            
            `
    );
    console.log(recordset);
    return recordset[0] || {};
  }

  async update(
    id_problem,
    {
      title,
      employer_name,
      requirements,
      modality,
      salary_range1,
      salary_range2,
      short_description,
      long_description,
      file_url,
      category,
      schedule,
    }
  ) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_problem", id_problem);
    request.input("title", title);
    request.input("employer_name", employer_name);
    request.input("requirements", requirements);
    request.input("modality", modality);
    request.input("salary_range1", salary_range1);
    request.input("salary_range2", salary_range2);
    request.input("short_description", short_description);
    request.input("long_description", long_description);
    request.input("file_url", file_url);
    request.input("category", category);
    request.input("schedule", new Date(schedule));
    const { recordset } = await request.query(
      `
            UPDATE job_offers
            SET title               = @title,
                employer_name       = @employer_name,
                requirements        = @requirements,
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
    );
    return recordset[0] || {};
  }

  async remove({ id_problem }) {
    const cnx = await this.provider.getConnection();
    const request = await cnx.request();
    request.input("id_problem", id_problem);
    const { recordset } = await request.query(
      `
              DELETE FROM job_offers
              WHERE id = @id_problem
              SELECT @@ROWCOUNT AS [count]
            `
    );
    return recordset[0] || {};
  }
}

module.exports = ProblemService;

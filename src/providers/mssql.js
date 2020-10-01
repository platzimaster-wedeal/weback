"use strict";

const sql = require( "mssql" );

const config = require('../config');
const error = require('../utils/error')

const dbConfig = {
    server: config.mssql.server,
    port: config.mssql.port,
    user: config.mssql.user,
    password: config.mssql.password,
    database: config.mssql.database,
    options: config.mssql.options,
};

class MssqlProvider {
	static pool = null;

	constructor() {
		this.getConnection();
	}

	async closePool() {
		try {
			await MssqlProvider.pool.close();
			this.pool = null;
		} catch ( e ) {
			this.pool = null;
			throw error('Unexpected problem at close connection', 503);
		}
	};

	async getConnection() {
		try {
			if ( MssqlProvider.pool ) {
				return MssqlProvider.pool;
			}
			MssqlProvider.pool = await sql.connect( dbConfig );
			MssqlProvider.pool.on( "error", async e => {
				await closePool();
				// throw error('Lost connection', 503);
			} );
			console.log('DB is connectted succesfully')
			return MssqlProvider.pool;
		} catch( e ) {
			console.log(e)
			MssqlProvider.pool = null;
			// throw error('Unexpected problem to get connection', 503);
		}
	};
};

module.exports = new MssqlProvider();

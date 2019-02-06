/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * SessionFactory - This class creates a connection pool to the DB in order
 * to be used by DAO classes for all queries.
 */
import { Pool } from 'pg';

export class SessionFactory {
  static cred = {
    database: process.env.PostgreSQLDB,
    host: process.env.PostgreSQLEndpoint,
    user: process.env.PostgreSQLUser,
    password: process.env.PostgreSQLPassword,
    max: 10,
    port: process.env.PostgreSQLPort
  };
  static pool: Pool;
  static created = false;

  static getConnectionPool(): Pool {
    if (!this.created) {
      this.pool = new Pool(this.cred);
      this.created = true;
    }
    return this.pool;
  }
}
/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The Role DAO handles the DB connection and query for the role information.
 */
import { SessionFactory } from '../util/session-factory';

export class RoleDao {
  public async getRole(roleId: number) {
    // console.log(`The number passed in is: ${roleId}`);
    const pool = SessionFactory.getConnectionPool();
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT "role" FROM "roles" where role_id=$1`, [roleId]);
      await client.release();
      // console.log(`Role n DAO: ${result.rows[0]['role']}`);
      return result.rows[0]['role'] || false;
    } catch (error) {
      // console.log(`Looking up the role has failed!\n${error}`);
    }
  }
}
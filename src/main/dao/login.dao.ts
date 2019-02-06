/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The Login DAO handles the DB connection and query for logging in.
 * It validates the input to ensure that the user has credentials to access the system
 * Features:
 * Hashing - Compares the given password with the hash stored for that username.
 */
import { SessionFactory } from '../util/session-factory';
import { Hashing } from '../security/hashing';

export class LoginDao {
  public async login(username: string, password: string) {
    const pool = SessionFactory.getConnectionPool();
    let result;
    try {
      const client = await pool.connect();
      result = await client.query('SELECT * FROM users WHERE username=$1;', [
        username
      ]);
      await client.release();
      if (result) {
        // console.log(`LoginDao Results: ${result.rows[0]['password']}`);

        // Compare password with stored hash value.
        const hash = new Hashing();
        // console.log('About to hash the pswd');
        if (hash.compareHash(password, result.rows[0]['password'])) {
          // console.log('Inside compHash in login DAO, pswd valid');
          return result.rows[0];
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(`An error occurred while trying to access the db:\n${error}`);
    }
  }
}

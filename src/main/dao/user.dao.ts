/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The User DAO handles the DB connection and queries for users.
 * It provides the ability to find all users, find users by
 * user_id and updates a user.
 * 
 * Features:
 * constructUpdate - Used to construct the update query for users
 */
import { SessionFactory } from '../util/session-factory';
import { User } from '../models/user';
import { constructUpdate } from './constructUpdate';

export class UserDao {
  // Find all users
  public async findAllUsers() {
    const pool = SessionFactory.getConnectionPool();
    try {
      const client = await pool.connect();
      // console.log('Connected to db ...');
      const result = await client.query('SELECT * FROM users;');
      await client.release();
      if (result) {
        // console.log('All Users in DAO:\n', result.rows);
        return result.rows || false;
      }
    } catch (error) {
      console.log('The userDao failed to get all users:\n', error);
    }
  }

  // Find user by user_id
  public async findByUserId(id: number) {
    const pool = SessionFactory.getConnectionPool();
    try {
      const client = await pool.connect();
      // console.log('Connected to db ...');
      const result = await client.query('SELECT * FROM users WHERE user_id=$1;', [id]);
      await client.release();
      if (result) {
        // console.log('User by id in DAO:\n', result.rows[0]);
        return result.rows[0] || false;
      }
    } catch (error) {
      console.log('The userDao failed to get the user (id)\n', error);
    }
  }

  // Update a user's information
  public async updateUser(userData: User, curUser: number) {
    // console.log('The user data to update is ', userData);
    const pool = SessionFactory.getConnectionPool();
    try {
      const client = await pool.connect();
      // console.log('Connected to db ...');
      let userFields = ['username', 'password', 'first_name', 'last_name', 'email', 'role_id'];

      // Construct update query with values from request
      let queryObj = constructUpdate(userFields, userData, 'user_id', curUser);
      // console.log('Query to run for update:\n', queryObj);
      const result = await client.query(`UPDATE users SET ${queryObj.qString}`, queryObj.arrVals);
      await client.release();

      // Return result
      console.log('Result from user update (dao): ', result.rows[0]);
      return result.rows[0] || false;
    } catch (error) {
      console.log('The userDao failed to update the user\n', error);
    }
  }
}
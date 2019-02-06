/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * Hashing - This class contains functions for hashing passwords as well as validating
 * plain-text passwords against hashes.
 */
import bcrypt from 'bcrypt';

export class Hashing {
  // Accepts plain-text and returns the hashed value.
  hashPswd(password) {
    return bcrypt.hashSync(password, 10);
  }

  // Compares given password with the provided hashed value (from our database).
  compareHash(password, hashVal) {
    // console.log("Comparing Password Hash");
    return bcrypt.compareSync(password, hashVal) ? true : false;
  }
}

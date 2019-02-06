/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * 
 * constructUpdate function is used by both the User and Reimbursement DAO.
 * It constructs the update query used in these methods.
 * Features:
 * Reimbursements - If the status has been changed and updates the resolved date accordingly.
 * Users - If password is changed it will hash it and include the hashed value to update.
 */
import { User } from '../models/user';
import { Reimbursements } from '../models/reimbursements';
import bcrypt from 'bcrypt';

// Construct Update query for Users and Reimbursements
export function constructUpdate(
  fields: string[],
  obj: Reimbursements | User,
  idType: string,
  currentUser: number
) {
  let str = '';
  let numOfInputs = 1;
  let keep = [];
  let statChanged = false;
  let resolverSet = false;
  for (let i = 0; i < fields.length; i++) {
    // If field is defined put data from request into the query
    if (obj[fields[i]]) {
      str += `${fields[i]}=$${numOfInputs++}, `;
      if (fields[i] === 'status_id') {
        statChanged = true;
        // console.log('Status_id has changed!');
      } else if (fields[i] === 'password') {
        // If password is changed then hash it and store the hashed value (Users Only)
        const hash = bcrypt.hashSync(obj[fields[i]], 10);
        // console.log('New password after hashing (cu):\n', hash);
        obj[fields[i]] = hash;
      } else if (fields[i] === 'resolver_id') {
        obj[fields[i]] = currentUser;
        resolverSet = true;
      }
      // Maintain an array of user input values
      keep.push(obj[fields[i]]);
    }
  }

  // If the status_id changes, update the date_resolved and resolver (Reimbursements Only)
  // console.log(`We now check if the status_id has changed`);
  if (statChanged) {
    if (!resolverSet) {
      str += `resolver_id=${currentUser}, `;
    }
    // console.log('What is the reimburse_id: ', obj[idType]);
    str += `date_resolved=NOW() WHERE ${idType}=${obj[idType]} RETURNING *;`;
  }

  // Remove trailing comma and space add returning statement.
  if (str.endsWith(', ')) {
    str = str.slice(0, str.lastIndexOf(','));
    // console.log('What is the user_id: ', obj[idType]);
    str += ` WHERE ${idType}=${obj[idType]} RETURNING *;`;
  }
  let queryObj = {
    qString: str,
    arrVals: keep
  };
  return queryObj;
}

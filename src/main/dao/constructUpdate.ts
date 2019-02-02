import { User } from '../models/user';
import { Reimbursements } from '../models/reimbursements';

// Construct Update query for Users and Reimbursements
export function constructUpdate(fields: string[], obj: Reimbursements|User, idType: string) {
  let str = '';
  let numOfInputs = 1;
  let keep = [];
  let statChanged = false;
  for (let i = 0; i < fields.length; i++) {
    // If field is defined put data from request into the query
    if (obj[fields[i]]) {
      str += `${fields[i]}=$${numOfInputs++}, `;
      if(fields[i] === 'status_id'){
        statChanged = true;
        console.log('Status_id has changed!');
      }
      // Maintain an array of user input values
      keep.push(obj[fields[i]]);
    } 
  }
  // If the status_id changes update the date_resolved
    console.log(`We now check if the status_id has changed`);
    if(statChanged) {
      console.log('What is the reimburse_id: ', obj[idType]);
      str += `date_resolved=NOW() WHERE ${idType}=${obj[idType]} RETURNING *;` ;
    }
  // Remove trailing comma and space add returning statement.
  if(str.endsWith(', ')) {
    str = str.slice(0, str.lastIndexOf(","));
    console.log('What is the user_id: ', obj[idType]);
    str += ` WHERE ${idType}=${obj[idType]} RETURNING *;`
  }
  let queryObj = {
    qString: str,
    arrVals: keep
  };
  return queryObj;
}
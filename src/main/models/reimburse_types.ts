/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * Reimbursement-status - Class used to determine role
 */
export class ReimburseTypes {
  lodging = 1;
  travel = 2;
  food = 3;
  other = 4;

  getReimbTypes(type_id: number) {
    if (type_id === 1) {
      return "Lodging";
    } else if (type_id === 2) {
      return "Travel";
    } else if (type_id === 3) {
      return "Food";
    } else {
      return "Other";
    }
  }
}
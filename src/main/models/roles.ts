/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * Reimbursement-status - Class used to determine role
 */
export class Roles {
  admin: 1;
  financeMngr: 2;
  associate: 3;

  getRole(role_id: number) {
    if (role_id === 1) {
      return "Admin";
    } else if (role_id === 2) {
      return "Finance Manager";
    } else {
      return "Associate";
    }
  }
}
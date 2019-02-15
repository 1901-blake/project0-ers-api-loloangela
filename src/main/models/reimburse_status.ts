/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * Reimbursement-status - Class used to determine role
 */
export class ReimburseStatus {
  pending: 1;
  approved: 2;
  denied: 3;

  getStatus(status_id: number) {
    if (status_id === 1) {
      return "Pending";
    } else if (status_id === 2) {
      return "Approved";
    } else {
      return "Denied";
    }
  }
}

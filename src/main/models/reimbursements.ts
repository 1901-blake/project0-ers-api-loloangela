/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * Reimbursements - Class to represent reimbursements how they are
 * represented in the DB.
 * 
 * Features:
 * Class fields are named as they are in the table to limit confusion.
 */
export class Reimbursements {
  reimburse_id: number;   // primary key
  author_id: number;      // foreign key -> User, not null
  amount: number;         // not null
  date_submit: string;    // not null
  date_resolved: string;  // not null
  description: string;    // not null
  resolver_id: number;    // foreign key -> User
  status_id: number;      // foreign key -> ReimbursementStatus, not null
  type_id: number;        // foreign key -> ReimbursementType
}
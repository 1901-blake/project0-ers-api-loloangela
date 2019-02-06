/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * Users - Class to represent users how they are represented in the DB.
 * 
 * Features:
 * Class fields are named as they are in the table to limit confusion.
 */
export class User {
  user_id: number; // primary key
  username: string; // not null, unique
  password: string; // not null
  first_name: string; // not null
  last_name: string; // not null
  email: string; // not null
  role_id: number; // not null
}
/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The loginAuthMid - A middleware used to determine if a user is logged in.
 */
export function loginAuthMid(req, res, next) {
  // console.log('Authentication claims are: user_id and role ', [req.session.user['user_id'], req.session.user['role']]);
  const user = req.session.user;
  user ? next() : res.status(401).send('The incoming token has expired.\nYou must be logged in to access resources.');
}
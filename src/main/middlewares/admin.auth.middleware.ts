/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The adminAuthMid - A middleware used to determine if a user is admin.
 */
export function adminAuthMid(req, res, next) {
  // console.log('Authentication claims are: ', req.session.user['role']);
  const role = req.session.user['role'];
  role === 'admin' ? next() : res.status(401).send('The incoming token has expired.');
}
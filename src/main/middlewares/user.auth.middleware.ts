/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * This API implements an Expense Reimbursement System
 * 
 * The userAuthMid - A middleware used to determine if the logged in user's id is
 * the same as the id being requested for lookup. 
 * This function is used in lookups that require a user_id.
 */
export function userAuthMid(req, res, next) {
  // console.log('Authentication claims logged in user\'s id and the requested user_id', [req.session.user['user_id'], req.params.userid]);
  const loggedInUser = req.session.user['user_id'];
  const lookup = +req.params.userid;
  if (loggedInUser === lookup) {
    res.locals.isUser = true;
    // console.log('res.locals.isUser is (userAuth): ', res.locals.isUser);
  }
  // Regardless of results we continue on to the next middleware
  next();
}
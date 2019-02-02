// UserAuthMiddleware checks to see if the userid is passed in is the user
// id of the logged in user

export function userAuthMiddleware(req, res, next) {
  console.log('Authentication claims logged in user\'s id and the requested user_id', [req.session.user['user_id'], req.params.userid]);
  const loggedInUser = req.session.user['user_id'];
  const lookup = +req.params.userid;
  // console.log('Lookup: ', lookup);
  // console.log('LoggedIn: ', loggedInUser);
  if (loggedInUser === lookup) {
    res.locals.isUser = true;
    console.log('res.locals.isUser is (userAuth): ', res.locals.isUser);
  }
  next();
}
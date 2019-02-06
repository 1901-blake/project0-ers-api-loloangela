// Check that logged in user is either finance-manager or admin
export function financeAdminAuthMid(req, res, next) {
  // console.log('Authentication claims are: ', req.session.user['role']);
  if (res.locals.isUser) {
    // console.log('User is requesting themselves ... continue\n', res.locals.isUser);
    next();
  } else {
    // Have to use the else or it will try to execute the next below and kill itself!!!
    const role = req.session.user['role'];
    role === 'admin' || role === 'finance-manager' ? next() : res.status(401).send('The incoming token has expired.');
  }
}
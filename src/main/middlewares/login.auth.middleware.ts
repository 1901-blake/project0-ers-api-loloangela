export function loginAuthMid(req, res, next) {
  console.log('Authentication claims are: user_id and role ', [req.session.user['user_id'], req.session.user['role']]);
  const user = req.session.user;
  user ? next() : res.status(401).send('The incoming token has expired.\nYou must be logged in to access resources.');
}
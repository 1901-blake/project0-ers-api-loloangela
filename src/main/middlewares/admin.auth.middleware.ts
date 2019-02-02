// This middleware will check that the user is admin
export function adminAuthMid(req, res, next) {
  console.log('Authentication claims are: ', req.session.user['role']);
  const role = req.session.user['role'];
  role === 'admin' ? next() : res.status(401).send('The incoming token has expired.');
}
import express, { response } from 'express';
import { LoginDao } from '../dao/login.dao';
import { RoleDao } from '../dao/role.dao';

export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
  console.log('Made it to the login router.');
  const loginDao = new LoginDao();

  try {
    const result = await loginDao.login(req.body['username'], req.body['password']);
    if (result) {
      console.log(`After cred validation the result is:`);
      console.log(result);
      // Find the role and package the user_id and role in an object and attach it to the session.
      const roleDao = new RoleDao();
      const roleRes = await roleDao.getRole(result['role_id']);
      if (roleRes) {
        console.log('After role_id lookup (router):');
        console.log(roleRes);
        let user = {
          user_id: result['user_id'],
          role: roleRes,
          isUser: ''
        };
        console.log('Created user object for session (router):');
        req.session.user = user;
        console.log('Set session data: (router)');
        res.json(result);
      }
    }
  } catch (error) {
    console.log('An error occured while trying to login (router)');
    res.status(400).send('Invalid Credentials');
  }
});
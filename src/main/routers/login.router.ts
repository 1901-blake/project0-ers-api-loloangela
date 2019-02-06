/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * login.router - Async function used to handle the only HTTP request (POST)
 * that can be made from the /login url.
 * 
 * Features:
 * Session Data - Includes the user_id and role. The LoginDao and RoleDao are called
 * to create the pair that makes up the session data.
 */
import express from 'express';
import { LoginDao } from '../dao/login.dao';
import { RoleDao } from '../dao/role.dao';
import { pswd } from "../index";
export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
  // console.log('Made it to the login router.');
  const loginDao = new LoginDao();

  try {
    const result = await loginDao.login(req.body['username'], req.body['password']);
    if (result) {
      console.log(`After cred validation the result is:\n`, result);
      // Remove user password for security
      result.password = pswd;
      // Find the role and package the user_id and role in an object and attach it to the session.
      const roleDao = new RoleDao();
      const roleRes = await roleDao.getRole(result['role_id']);
      if (roleRes) {
        console.log('Role (login.router):\n', roleRes);
        const user = {
          user_id: result['user_id'],
          role: roleRes
        };
        // console.log('Created user object for session (router):\n', typeof user);
        req.session.user = user;
        console.log('Set session data: (router)\n', req.session.user);
        res.json(result);
      } else {
        res.status(500).send('An error occured please retry your request later.');
      }
    } else {
      console.log('Failed!');
      res.status(400).send('Invalid Credentials');
    }
  } catch (error) {
    console.log('An error occured while trying to login (router)', error);
    res.status(400).send('Invalid Credentials');
  }
});
import express from 'express';
import { UserDao } from '../dao/user.dao';
import { loginAuthMid as loginAuth } from '../middlewares/login.auth.middleware';
import { financeAdminAuthMid as financeAdminAuth } from '../middlewares/finance-admin.auth.middleware';
import { adminAuthMid as adminAuth } from "../middlewares/admin.auth.middleware";
import { userAuthMiddleware as userAuth } from '../middlewares/user.auth.middleware';
import { User } from '../models/user';
import { pswd } from "../index";

export const usersRouter = express.Router();

// Find all Users 
usersRouter.get('', [loginAuth, financeAdminAuth, async (req, res) => {
  try {
    const userDao = await new UserDao(); 
    const result = await userDao.findAllUsers();
    if (result) {
      console.log('All Users Result in Router:\n', result);
      // Replace users passwords
      result.forEach(element => {
        element.password = pswd;
      });
      res.status(201).json(result);
    }
  } catch (error) {
    console.log('Unable to get all users (router)', error);
    res.status(401).send('Unable to get users');
  }
}]);

// Find Users by user_id
// Same error as the reimbursement_id
usersRouter.get('/:userid', [loginAuth, userAuth, financeAdminAuth, async (req, res) => {
  console.log("Inside userRouter findById");

  try {
    const userDao = await new UserDao(); 
    const result = await userDao.findByUserId(req.params.userid);
    if (result) {
      console.log('Users Result in Router:\n', result);
      // Remove password for security
      result.password = pswd;
      res.status(201).json(result);
    }
  } catch (error) {
    console.log('Unable to get user by id (router):\n', error);
    res.status(401).send('Unable to get the user');
  }
}]);

// Update user info (admin only)
usersRouter.patch('', [loginAuth, adminAuth, async (req, res) => {
  console.log('Inside the user router (update)');
  const user = new User();
  console.log(req.body);
  user.email = req.body.email;
  user.user_id = +req.body.user_id;
  user.password = req.body.password;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.username = req.body.username;
  user.role_id = +req.body.role_id;
  console.log('User_id in router before constructing query: ', user.user_id);
  try {
    const userDao = await new UserDao();
    const result = await userDao.updateUser(user);
    console.log('User update request: \n', result);
    if (result) {
      // Remove password for security
      result.password = pswd;
      res.status(201).json(result);
    }
  } catch (error) {
    console.log('Error updating user (router)\n', error);
  }
}]);
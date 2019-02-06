/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * reimburse.router - Set of functions used to handle HTTP requests (POST, GET, PATCH)
 * that can be made from the /reimbursements url.
 * 
 * Features:
 * Security - Uses middlewares to determine if the user is logged in and if they have the
 * necessary permissions to access the requested resource.
 */
import express from 'express';

import { loginAuthMid as loginAuth } from '../middlewares/login.auth.middleware';
import { financeAdminAuthMid as financeAdminAuth } from '../middlewares/finance-admin.auth.middleware';
import { userAuthMid as userAuth } from '../middlewares/user.auth.middleware';
import { Reimbursements as Reimburse } from '../models/reimbursements';
import { ReimbursementDao } from '../dao/reimburse.dao';


export const reimburseRouter = express.Router();

// Submit new reimbursement
reimburseRouter.post('', [loginAuth, async (req, res) => {
  // console.log('Made it to reimbursement router ...');
  // Take request and upload to DB.
  const reimbursement = new Reimburse();
  reimbursement.author_id = req.body.author_id;
  reimbursement.amount = req.body.amount;
  reimbursement.date_submit = req.body.date_submit;
  reimbursement.description = req.body.description;
  reimbursement.resolver_id = req.body.resolver_id;
  reimbursement.status_id = req.body.status_id;
  reimbursement.type_id = req.body.type_id;

  try {
    const reimburseDao = await new ReimbursementDao();
    const result = await reimburseDao.newReimburse(reimbursement);
    if (result) {
      console.log('Reimburse response:\n', result);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(`Creating new reimbursement failed. (router)\n${error}`);
    res.status(400).send('Unable to add new record');
  }
}])

// Find reimbursement by status_id
reimburseRouter.get('/status/:statusid', [loginAuth, financeAdminAuth, async (req, res) => {
  // console.log('Inside reimbursement router for find by status');
  try {
    const reimburseDao = await new ReimbursementDao();
    const result = await reimburseDao.findById(req.params.statusid);
    if (result) {
      console.log('Reimbursements by status_id:\n', result);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log('Error retrieving the reimbursements (router)\n', error);
    res.status(400).send('Unable to locate reimbursements (status)');
  }
}]);

// Find reimbursement by user_id
reimburseRouter.get('/author/:userid', [loginAuth, userAuth, financeAdminAuth, async (req, res) => {
  //console.log('Inside reimbursement router for find by user');
  try {
    const reimburseDao = await new ReimbursementDao();
    // console.log('Param (userid) is: ', req.params.userid);
    const result = await reimburseDao.findByUserId(req.params.userid);
    if (result) {
      console.log('Reimbursement by user_id (router):\n', result);
      res.json(result);
    }
  } catch (error) {
    console.log('Error retrieving the reimbursements (router)\n', error);
    res.status(400).send('Unable to locate reimbursements (user)');
  }
}]);

// Update reimbursement
reimburseRouter.patch('', [loginAuth, financeAdminAuth, async (req, res) => {
  console.log('Inside reimburse router for update');
  const reimbursement = new Reimburse();
  console.log(req.body);
  reimbursement.reimburse_id = req.body.reimburse_id;
  reimbursement.author_id = req.body.author_id;
  reimbursement.amount = req.body.amount;
  reimbursement.date_submit = req.body.date_submit;
  reimbursement.description = req.body.description;
  reimbursement.resolver_id = req.body.resolver_id;
  reimbursement.status_id = req.body.status_id;
  reimbursement.type_id = req.body.type_id;
  try {
    const reimburseDao = await new ReimbursementDao();
    const result = await reimburseDao.updateReimbursement(reimbursement, req.session.user['user_id']);
    console.log('Reimburse update request: \n', result);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    console.log('Error updating reimbursements (router)\n', error);
  }
}]);
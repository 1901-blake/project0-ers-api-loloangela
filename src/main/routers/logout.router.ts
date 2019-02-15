/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * logout.router - Async function used to handle the only HTTP request (POST)
 * that can be made from the /logout url.
 * 
 * Features:
 * Session Data - Includes the user_id and role. The LoginDao and RoleDao are called
 * to create the pair that makes up the session data.
 */

import express from 'express';

const logoutRouter = express.Router();
logoutRouter.get('/logout', (req, res) => {
  req.session.destroy;
  res.redirect('/');
})
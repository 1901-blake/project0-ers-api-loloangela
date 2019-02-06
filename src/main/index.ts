/* 
 * ERS API
 * Author: Lori A. Oliver
 * 02/06/2019
 * Revature - Blake 1901
 * 
 * This API implements an Expense Reimbursement System.
 * Fulfilling the requirements at:
 * https://github.com/1901-blake/project0-ers-api-loloangela/blob/master/README.md
 * 
 * index - Sets up server, listens for requests and routes them accordingly.
 * It is the entry point by which all the features of this API are accessed.
 */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import { loginRouter } from './routers/login.router';
import { usersRouter } from './routers/users.router';
import { reimburseRouter } from './routers/reimburse.router';

const app = express();
const port = 3000;		// Port to listen for requests
export const pswd: string = '********';   // Password Cover

// Global Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session
const sess = {
	secret: 'My Secret Token',
	cookie: { secure: false },
	resave: false,
	saveUninitialized: false
};
app.use(session(sess));
//app.use('/login', express.static('webpages'));

// Cors
/* 
app.use((req, resp, next) => {
	resp.header('Access-Control-Allow-Origin', `http://localhost:5500`);
	resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	resp.header('Access-Control-Allow-Credentials', 'true');
	next();
}); */

// Routers
app.use('/login', loginRouter);
app.use('/reimbursements', reimburseRouter);
app.use('/users', usersRouter);

// Start server and listen for requests 
app.listen(3000);
console.log(`Application running on port ${port} ...`);
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import { loginRouter } from './routers/login.router';
import { usersRouter } from './routers/users.router';
import { reimburseRouter } from './routers/reimburse.router';

const app = express();
const welcomeMsg = "<h1>Welcome To ERS</h1>";
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session
const sess = {
  secret: 'My Secret Token',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: false
};
app.use(session(sess));
app.get('', (req, res) => {
  res.send(welcomeMsg);
})

// Default password 
export const pswd: string = '********';
// Routers
app.use('/login', loginRouter);
app.use('/reimbursements', reimburseRouter);
app.use('/users', usersRouter);

app.listen(3000);
console.log('Application running on port 3000 ...');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs/promises')
const {
  PORT,
  SESSION_KEY
} = process.env;

const app = express();

// parsing the body
app.use(express.json());
// set up session configuration
app.use(session({
  secret: SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true }
}));
app.use('/', express.static('./public'));
// routes
app.use(require('./middlewares/prepareDb'));
app.use('/refresh', require('./routes/refresh'));
app.use(require('./middlewares/isNewUser'));
app.use('/tasks', require('./routes/task'));

app.listen(PORT, async () => {
  console.log(`The web service is running at ${PORT}...`);
  // creating db
  await fs.writeFile('./db.json', JSON.stringify({
    users: []
  }));
});
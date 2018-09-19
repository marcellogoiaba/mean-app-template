const express = require('express');
const app = express();

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/hello', (req, res) => {
    res.send('Hello');
  })

  router.post('/register', (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
  });

  return router;
}

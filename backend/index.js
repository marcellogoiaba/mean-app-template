const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// let router = require('./routes/db');
let User = require('./models/user');

const db = mongoose.connect('mongodb://localhost:27017/myTemplateApp', (err, resp) => {
  if(err){
    console.log('There is an error connecting with DB', err);
  }
  console.log('DB connection is up and running');
});

app.set('port', process.env.port || 3000);
app.use(bodyParser.json());


//add the route for the app
app.get('/', (req, res) => {
  res.send('Hello');
})

app.post('/register', (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;

  let user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.password = password;

  user.save((err, result) => {
    if(err){
      console.log('Error adding user in DB');
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})


app.listen(app.get('port'), (err, res) => {
  console.log('Backend server started on port', app.get('port'));
});


let express = require('express');
let router = express.Router();
const assert = require('assert');
const User = require('../models/user')
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config');
let nodemailer = require('nodemailer');



router.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  } else {
    let newUser = new User({
      email: req.body.email,
      first_name: req.body.first_name,
      username: req.body.username,
      last_name: req.body.last_name,
      password: req.body.password
    });


    newUser.save((err) => {
      if(err){
        console.log(err);
        res.status(409);
        res.send({messsage: 'That email already exists in our Database'})
      }
      else{
        res.status(201);
        res.json({content:newUser});

      }
    })
  }
});

router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find({}, function(err, users) {
    console.log(users);
    res.json(users);
  });
});

router.get('/user/:id' , (req, res) => {
  User.findById(req.params.id, (err, user) => {
      res.json(user);
  });
});




router.get('/login', (req, res) => {
  res.json({
    message: 'user logged in'
  })
});

module.exports = router;

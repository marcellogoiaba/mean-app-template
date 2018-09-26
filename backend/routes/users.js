const express = require('express');
const assert = require('assert');
const router = express.Router();
const User = require('../models/user')
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config');
// let nodemailer = require('nodemailer');



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


router.post('/auth', (req, res) => {

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401);
      // same message for username wrong or password (security reasons)
      res.send({message: 'Authentication failed. User not found.'});
    } else {
      // Check if password matches
      console.log('db password=', user.password);


      user.comparePassword(req.body.password,(err, isMatch) => {

        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.auth.secret, {
            expiresIn: "2 days"
          });
          console.log(user);
          let message = {content:user, token: {authToken:token}};
          res.json(message);
        } else {
          res.status(401);
          res.send({message: 'Authentication failed. Invalid username or password.'});
        }
      });
    }
  });
});


//get all users
router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.find({}, function(err, users) {
    console.log(users);
    res.json(users);
  });
});

//get one user by id
router.get('/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
      res.json(user);
  });
});

//edit user by id
router.put('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(`Updating user`);

  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(404);
      res.send({message: 'Resource not found'});
    } else{
      console.log(req.body);
      user.set(req.body);

      user.save(function (err, user) {
        console.log(user);
        res.json({content:user});
      });
    }
  });
});


module.exports = router;

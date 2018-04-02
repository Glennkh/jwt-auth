const User = require('../models/User');
const Issue = require('../models/Issue');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

  // Return list of users email and their id
  index: (req, res, next) => {
    User.find({}, 'email _id', function(err, users) {
      res.json(users);
    });
  },

  // Authenticate user return jwt token to be store in local storage on client side
  register: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.json({
        success: false,
        message: 'Please enter email and password.'
      });
    } else {
      let newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
  
      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({
            success: false,
            message: 'That email address already exists.'
          });
        }
        res.json({
          success: true,
          message: 'Successfully created new user.'
        });
      });
    }
  },

  // Authenticate user
  signin: (req, res, next) => {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user.toObject(), config.auth.secret, {
              expiresIn: "2 days"
            });
            res.json({
              success: true,
              message: 'Authentication successfull',
              token
            });
          } else {
            res.send({
              success: false,
              message: 'Authentication failed. Passwords did not match.'
            });
          }
        });
      }
    });
  },

  // View all issues created by user
  getIssues: (req, res, next) => {
    User.findById({_id: req.params.id}).populate('issues').exec(function(err, user) {
      res.json(user.populate().issues);
    });
  },

  // Create a issue
  newIssue: (req, res, next) =>{

    const newIssue = new Issue({
      name: req.body.name,
      description: req.body.description,
      building: req.body.building,
      floor: req.body.floor,
      room: req.body.room,
      creator: req.user._id
    });

    User.findById(req.user._id, (err, user, next) => {
      if (err) return next(err);
      user.issues.push(newIssue);
      user.save();
    });


    newIssue.save(function(err) {
      if (err) return next(err);
      
      res.json({
        success: true,
        message: 'Successfully created new issue.'
      });

    });
    
  }

  
}
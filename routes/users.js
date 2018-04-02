const express = require('express');
const router = express.Router();
const passport = require('passport');
const UsersController = require('../controllers/users');

router.get('/', UsersController.index);

// Register new users
router.post('/register', UsersController.register);

router.post('/signin', UsersController.signin);

router.get('/:id/issues', UsersController.getIssues);

// Authenticated route new issue can not be created without jwt token supplied at login
router.post('/newIssue', passport.authenticate('jwt', {session: false}), UsersController.newIssue);

// Example of required auth: protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', {
  session: false
}), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;

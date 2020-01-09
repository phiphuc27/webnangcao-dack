var express = require('express');
var router = express.Router();
const passport = require('passport');
//var UsersModel = require('../models/Users');

//const bcrypt = require('bcryptjs');
const utils = require('../utils');

const { loginValidation } = require('../validation');

//const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Message: this is api of authority');
});

router.get('/login', (req, res) => {
  res.sendStatus(200);
});
/* POST login user */
router.post('/login', async (req, res) => {
  // validation
  console.log('api post login');
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  passport.authenticate('local', { session: false }, (err, user, info) => {
    //console.log(user);
    if (err || !user) {
      //console.log('400 code');
      return res.status(400).send({
        message: 'Something is not right',
        user: user
      });
    }
    if (user.LOAI !== 1 && user.LOAI !== 0) {
      return res.status(400).send({
        message: 'The account login is not admin',
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = utils.generateToken(user.ID);
      //user = utils.getCleanUser(user);
      return res.json({ user: user, token: token });
    });
  })(req, res);
});

module.exports = router;

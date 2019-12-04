var express = require('express');
var router = express.Router();
const passport = require('passport');
var UsersModel = require('../models/Users');

const aws = require('aws-sdk');

const bcrypt = require('bcryptjs');
const utils = require('../utils');

const { registerValidation, loginValidation } = require('../validation');

//const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Message: this is api of authority');
});

/* POST register user */
router.post('/register', async (req, res) => {
  // validation
  const { error } = registerValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  // checking if email is already in database
  const emailExist = await UsersModel.findByEmail(req.body.email);
  if (emailExist) return res.status(400).send('User is already existed!');

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = {
    EMAIL: req.body.email,
    MATKHAU: hashedPassword,
    LOAI: req.body.type
  };
  try {
    const savedUser = await UsersModel.insert(user);
    UsersModel.insertProfile({
      ID: savedUser.insertId,
      AVATARURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    });
    res.send({ userId: savedUser.insertId });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/login', (req, res) => {
  res.sendStatus(200);
});
/* POST login user */
router.post('/login', async (req, res) => {
  // validation
  console.log('api post login');
  const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(info);
    if (err || !user) {
      return res.status(400).send({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = utils.generateToken(user);
      user = utils.getCleanUser(user);
      return res.json({ user: user, token: token });
    });
  })(req, res);
});

router.post('/google', async (req, res) => {
  // checking if user email is already in database
  let userProfile = {
    google_id: req.body.googleId
  };
  const emailExist = await UsersModel.checkEmailExist(req.body.email);
  if (emailExist) {
    await UsersModel.findByEmail(req.body.email)
      .then(async user => {
        if (user.TEN === null)
          userProfile = { ...userProfile, TEN: req.body.givenName };
        if (user.HO === null)
          userProfile = { ...userProfile, HO: req.body.familyName };
        if (
          user.AVATARURL ===
          'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        )
          userProfile = { ...userProfile, AVATARURL: req.body.photoURL };
        await UsersModel.updateProfile(userProfile, user.id);
        const token = utils.generateToken(user.id);
        return res.json({ token: token });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).send(err);
      });
  } else {
    // create new user
    const user = {
      EMAIL: req.body.email,
      LOAI: req.body.type
    };
    try {
      const savedUser = await UsersModel.insert(user);

      userProfile = {
        ID: savedUser.insertId,
        TEN: req.body.givenName,
        HO: req.body.familyName,
        AVATARURL: req.body.photoURL
      };

      UsersModel.insertProfile(userProfile);
      const token = utils.generateToken(savedUser.insertId);
      return res.json({ token: token });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post('/facebook', async (req, res) => {
  // checking if user email is already in database
  let userProfile = {
    facebook_id: req.body.facebookId
  };
  const emailExist = await UsersModel.checkEmailExist(req.body.email);
  if (emailExist) {
    await UsersModel.findByEmail(req.body.email)
      .then(async user => {
        if (user.TEN === null)
          userProfile = { ...userProfile, TEN: req.body.name };
        if (
          user.AVATARURL ===
          'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        )
          userProfile = { ...userProfile, AVATARURL: req.body.photoURL };
        await UsersModel.updateProfile(userProfile, user.id);
        const token = utils.generateToken(user.id);
        return res.json({ token: token });
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  } else {
    // create new user
    const user = {
      EMAIL: req.body.email,
      LOAI: req.body.type
    };
    try {
      const savedUser = await UsersModel.insert(user);

      userProfile = {
        ID: savedUser.insertId,
        TEN: req.body.name,
        AVATARURL: req.body.photoURL
      };

      UsersModel.insertProfile(userProfile);
      const token = utils.generateToken(savedUser.insertId);
      return res.json({ token: token });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;

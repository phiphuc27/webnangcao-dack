const express = require('express');

const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/Users');

const utils = require('../utils');

// const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Message: this is api of authority');
});

/* POST register user */
router.post('/register', async (req, res) => {
  try {
    // checking if email is already in database
    const emailExist = await UsersModel.checkEmailExist(req.body.email);
    if (emailExist[0].emailExist)
      return res
        .status(400)
        .send('Email đã được đăng kí! Vui lòng nhập email khác.');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = {
      EMAIL: req.body.email,
      MATKHAU: hashedPassword,
      LOAI: req.body.type
    };

    const savedUser = await UsersModel.insert(user);
    UsersModel.insertProfile({
      ID: savedUser.insertId,
      AVATARURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    });
    return res.json({ userId: savedUser.insertId });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

/* POST login user */
router.post('/login', async (req, res) => {
  // validation
  console.log('api post login');

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.message,
        user
      });
    }
    return req.login(user, { session: false }, error => {
      if (err) {
        return res.send(error);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = utils.generateToken(user.ID);
      console.log(user);
      return res.json({ user, token });
    });
  })(req, res);
});

// eslint-disable-next-line consistent-return
router.post('/google', async (req, res) => {
  // checking if user email is already in database
  let userProfile = {
    GOOGLEID: req.body.googleId
  };
  const emailExist = await UsersModel.checkEmailExist(req.body.email);
  if (emailExist[0].emailExist) {
    await UsersModel.findByEmail(req.body.email)
      .then(async user => {
        if (user[0].TEN === null)
          userProfile = { ...userProfile, TEN: req.body.givenName };
        if (user[0].HO === null)
          userProfile = { ...userProfile, HO: req.body.familyName };
        if (
          user[0].AVATARURL ===
          'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        )
          userProfile = { ...userProfile, AVATARURL: req.body.photoURL };
        await UsersModel.updateProfile(userProfile, user[0].ID);
        const token = utils.generateToken(user[0].ID);
        return res.json({ token });
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
        AVATARURL: req.body.photoURL,
        GOOGLEID: req.body.googleId
      };

      UsersModel.insertProfile(userProfile);
      const token = utils.generateToken(savedUser.insertId);
      return res.json({ token });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

// eslint-disable-next-line consistent-return
router.post('/facebook', async (req, res) => {
  // checking if user email is already in database
  let userProfile = {
    FACEBOOKID: req.body.facebookId
  };
  const emailExist = await UsersModel.checkEmailExist(req.body.email);
  if (emailExist[0].emailExist) {
    await UsersModel.findByEmail(req.body.email)
      .then(async user => {
        if (user[0].TEN === null)
          userProfile = { ...userProfile, TEN: req.body.name };
        if (
          user[0].AVATARURL ===
          'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        )
          userProfile = { ...userProfile, AVATARURL: req.body.photoURL };
        await UsersModel.updateProfile(userProfile, user[0].ID);
        const token = utils.generateToken(user[0].ID);
        return res.json({ token });
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
        AVATARURL: req.body.photoURL,
        FACEBOOKID: req.body.facebookId
      };

      UsersModel.insertProfile(userProfile);
      const token = utils.generateToken(savedUser.insertId);
      return res.json({ token });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

router.post('/updateType', async (req, res) => {
  const user = await UsersModel.getUserById(req.id);
  if (!user) {
    return res.json({ result: 'error' });
  }
  if (user.LOAI !== '5') {
    return res.json({ result: 'error' });
  }
  await UsersModel.updateType(user.id, req.type);
  return res.json({ result: 'success' });
});

module.exports = router;

const express = require('express');
const nodeMailer = require('nodemailer');

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
      LOAI: req.body.type,
      TRANGTHAI: 2
    };

    const savedUser = await UsersModel.insert(user);
    UsersModel.insertProfile({
      ID: savedUser.insertId,
      AVATARURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    });

    // send email to verify
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASS_SENDER
      }
    });

    // hash id
    const mailOptions = {
      from: '"Đỗ Hồng Phúc" <dohongphuc1997@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Xác nhận email <Uber For Tutor>', // Subject line
      text: 'Vui lòng nhấn link bên dưới để xác nhận email.', // plain text body
      html: `<p>Vui lòng nhấn link bên dưới để xác nhận email.</p>
      <a href="${process.env.USER_SERVER_HOST}/auth/verify?hash=${hashedPassword}&id=${savedUser.insertId}">Link xác nhận</a>` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });

    return res.json({ userId: savedUser.insertId });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

// verify email
router.get('/verify', async (req, res) => {
  // get user from id
  const id = parseInt(req.query.id);
  const user = await UsersModel.getUserById(id);

  if (user.length <= 0) {
    return res.status(400).send('Không tìm thấy người dùng');
  }

  // check status
  if (user[0].TRANGTHAI !== 2) {
    return res.status(400).send('Email đã xác nhận');
  }
  // checking password
  if (user[0].MATKHAU === req.query.hash) {
    // set status to 0
    await UsersModel.updateStatus(id, 0).then(result => {
      return res.render('verifySuccess', { title: 'Uber For Tutor' });
    });
  } else {
    return res.status(400).send('Sai hash');
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
    // if not verify of lock send error
    if (user.TRANGTHAI === 2) {
      return res.send({
        message: 'Tài khoản chưa xác nhận email'
      });
    }
    if (user.TRANGTHAI === 1) {
      return res.send({
        message: 'Tài khoản đã bị khóa'
      });
    }
    // lock admin login
    if (user.LOAI === 0 || user.LOAI === 1) {
      return res.send({
        message: 'Không thể đăng nhập admin'
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

router.post('/update/type', async (req, res) => {
  try {
    const user = await UsersModel.getUserById(req.body.id);
    await UsersModel.updateType(user[0].ID, req.body.type);
    return res.json({ result: 'success' });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;

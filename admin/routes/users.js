const express = require('express');
const router = express.Router();
//const passport = require('passport');

const bcrypt = require('bcryptjs');

const { registerValidation, passwordValidation } = require('../validation');

var UsersModel = require('../models/Users');
var SkillModel = require('../models/Skill');
//const db = require('../db');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Admin Page' });
});

/* POST register user */
router.post('/register', async (req, res) => {
  //check if root admin
  if (req.user) {
    if (req.user.LOAI !== 0)
      return res
        .status(400)
        .send('Only root admin can register new admin account');
  }
  // validation
  //const { error } = registerValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  // checking if email is already in database
  const emailExist = await UsersModel.findByEmail(req.body.email);
  if (emailExist[0]) return res.status(400).send('User is already existed!');

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = {
    EMAIL: req.body.email,
    MATKHAU: hashedPassword,
    LOAI: 1
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

/* GET users listing. */
router.get('/profile', (req, res, next) => {
  res.type('json').send(JSON.stringify(req.user, null, '\t'));
});

router.post('/profile', (req, res, next) => {
  UsersModel.updateProfile(req.body, req.user.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/profile/changePassword', async (req, res, next) => {
  const { error } = passwordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!bcrypt.compare(req.body.old_password, req.user.password))
    return res.status(400).send('Your password is incorrect!');
  if (req.body.old_password === req.body.new_password)
    return res
      .status(400)
      .send('Your new password is same as your old password!');
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.new_password, salt);

  UsersModel.updatePassword(req.user.id, hashedPassword)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/getUserList', async (req, res, next) => {
  const list = await UsersModel.getUsersOnly();

  res.json(list);
});

router.post('/getUserInfo', async (req, res, next) => {
  const user = await UsersModel.getInfoUserById(req.body.id);
  // console.log(user);

  if (user.length > 0) {
    res.status(200).json(user[0]);
  } else {
    res.status(500).send('Không tìm thấy người dùng');
  }
});

router.post('/getUserSkill', async (req, res, next) => {
  const skill = await SkillModel.getSkillByUserId(req.body.id);

  res.json(skill);
});

router.post('/insertUserSkill', async (req, res, next) => {
  await SkillModel.insert({ IDND: req.body.id, KYNANG: req.body.skill })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/updateUserSkill', async (req, res, next) => {
  await SkillModel.update(req.body.id, req.body.skill)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/deleteUserSkill', async (req, res, next) => {
  SkillModel.delete(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;

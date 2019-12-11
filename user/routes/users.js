const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const { passwordValidation } = require('../validation');

const UsersModel = require('../models/Users');
const SkillModel = require('../models/Skill');
// const db = require('../db');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'User Page' });
});

/* GET users listing. */
router.get('/profile', (req, res, next) => {
  res.type('json').send(JSON.stringify(req.user, null, '\t'));
});

router.post('/profile', (req, res, next) => {
  UsersModel.updateProfile(req.body, req.user.ID)
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

router.post('/profile/changePhoto', async (req, res) => {
  const newPhoto = {
    AVATARURL: req.body.downloadUrl
  };
  UsersModel.updateProfile(newPhoto, req.user.ID)
    .then(result => {
      res.status(200).send(newPhoto);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/getUserInfo', async (req, res, next) => {
  const user = await UsersModel.getUserInfoById(req.body.id);
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

router.post('/insertUserSkills', async (req, res, next) => {
  // console.log(req.body.skill);
  const list = req.body.skill;
  const runSQL = async () => {
    const data = [];
    for (let i = 0; i < list.length; i++) {
      const res = await SkillModel.insert(list[i]);
      data.push(res.insertId);
    }
    return data;
  };
  runSQL()
    .then(result => {
      // console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
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

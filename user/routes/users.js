const express = require('express');

const router = express.Router();
const passport = require('passport');

const bcrypt = require('bcryptjs');

const UsersModel = require('../models/Users');
const SkillModel = require('../models/Skill');
// const db = require('../db');

router.get('/', (req, res) => {
  res.render('index', { title: 'User Page' });
});

/* GET users listing. */
router.get('/profile', (req, res) => {
  res.type('json').send(JSON.stringify(req.user, null, '\t'));
});

router.post('/profile', (req, res) => {
  UsersModel.updateProfile(req.body, req.user.ID)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/profile/changePassword', async (req, res) => {
  console.log(req.body);
  const checkPassword = await bcrypt.compare(
    req.body.oldPassword,
    req.user.MATKHAU
  );
  if (!checkPassword)
    return res.status(400).send('Mật khẩu không chính xác!');
  if (req.body.oldPassword === req.body.newPassword)
    return res
      .status(400)
      .send('Mật khẩu mới trùng với mật khẩu hiện tại của bạn!');
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  try {
    const result = await UsersModel.updatePassword(req.user.ID, hashedPassword);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/profile/changePhoto', async (req, res) => {
  const newPhoto = {
    AVATARURL: req.body.downloadUrl
  };
  UsersModel.updateProfile(newPhoto, req.user.ID)
    .then(() => {
      res.status(200).send(newPhoto);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/getUserInfo', async (req, res) => {
  const user = await UsersModel.getUserInfoById(req.body.id);
  // console.log(user);

  if (user.length > 0) {
    res.status(200).json(user[0]);
  } else {
    res.status(500).send('Không tìm thấy người dùng');
  }
});

router.post('/getUserSkill', async (req, res) => {
  const skill = await SkillModel.getSkillByUserId(req.body.id);

  res.json(skill);
});

router.post('/insertUserSkills', async (req, res) => {
  // console.log(req.body.skill);
  const list = req.body.skill;
  const runSQL = async () => {
    const data = await Promise.all(
      list.map(async item => {
        const result = await SkillModel.insert(item);
        return result.insertId;
      })
    );

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

router.post('/insertUserSkill', async (req, res) => {
  await SkillModel.insert({ IDND: req.body.id, KYNANG: req.body.skill })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/updateUserSkill', async (req, res) => {
  await SkillModel.update(req.body.id, req.body.skill)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/deleteUserSkill', async (req, res) => {
  SkillModel.delete(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;

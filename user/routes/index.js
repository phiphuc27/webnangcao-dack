const express = require('express');

const router = express.Router();
const passport = require('passport');
const utils = require('../utils');

const SkillModel = require('../models/Skill');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/skills', async (req, res) => {
  const skills = await SkillModel.getAllSkill();
  res.json({ result: 'success', skills });
});

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = utils.generateToken(req.user.ID);
    res.json({ user: req.user, token });
  }
);

module.exports = router;

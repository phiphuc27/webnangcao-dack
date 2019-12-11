const express = require('express');

const router = express.Router();
const passport = require('passport');
const utils = require('../utils');

const TutorModel = require('../models/Tutor');
const SkillModel = require('../models/Skill');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = utils.generateToken(req.user.ID);
    res.json({ user: req.user, token });
  }
);

router.get('/tutors', async (req, res) => {
  let tutors = await TutorModel.getAllTutor();
  if (tutors) {
    tutors = await Promise.all(
      tutors.map(async tutor => {
        const tmpTutor = { ...tutor };
        const skills = await SkillModel.getSkillByUserId(tmpTutor.ID);
        const newTutor = { ...tmpTutor, KYNANG: [...skills] };

        return newTutor;
      })
    );

    res.json({ result: 'success', tutors });
  }
});
router.get('/tutors/:id', async (req, res) => {
  const tutor = await TutorModel.getTutorByID(req.params.id);
  if (tutor) {
    const tmpTutor = { ...tutor[0] };
    const skills = await SkillModel.getSkillByUserId(tmpTutor.ID);
    const newTutor = { ...tmpTutor, KYNANG: [...skills] };

    res.json({ result: 'success', tutor: newTutor });
  }
});

module.exports = router;

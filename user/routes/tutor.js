const express = require('express');

const router = express.Router();

const TutorModel = require('../models/Tutor');
const SkillModel = require('../models/Skill');

router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  const tutor = await TutorModel.getTutorByID(req.params.id);
  if (tutor) {
    const tmpTutor = { ...tutor[0] };
    const skills = await SkillModel.getSkillByUserId(tmpTutor.ID);
    const newTutor = { ...tmpTutor, KYNANG: [...skills] };

    res.json({ result: 'success', tutor: newTutor });
  }
});

module.exports = router;

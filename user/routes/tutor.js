const express = require('express');

const router = express.Router();

const passport = require('passport');

const TutorModel = require('../models/Tutor');
const SkillModel = require('../models/Skill');
const RegisterTutorModel = require('../models/RegisterTutor');
const ContractModel = require('../models/Contract');

router.get('/', async (req, res) => {
  let tutors = await TutorModel.getAllTutor();
  if (tutors) {
    tutors = await Promise.all(
      tutors.map(async tutor => {
        const tmpTutor = { ...tutor };
        const skills = await SkillModel.getSkillByUserId(tmpTutor.ID);
        const review = await TutorModel.getReviewByTutorID(tmpTutor.ID);
        const newTutor = {
          ...tmpTutor,
          KYNANG: [...skills], DANHGIA: [...review]
        };

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
    const review = await TutorModel.getReviewByTutorID(tmpTutor.ID);
    const newTutor = { ...tmpTutor, KYNANG: [...skills], DANHGIA: [...review] };

    res.json({ result: 'success', tutor: newTutor });
  }
});

// register tutor for tutor

// get register data list for tutor
// data send:
// {
//  id: , // id tutor
// }
router.post('/registerTutor/getList', async (req, res) => {
  RegisterTutorModel.getByTutorId(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// delete
// data send:
// {
//  id: ,
// }
router.post('/registerTutor/delete', async (req, res) => {
  RegisterTutorModel.delete(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// update
// data send:
// {
//  id: , // id of row in table of db
//  value: {
//    TIEUDE: ,
//    DIACHI: ,
//    DIENTHOAI: ,
//    NGAYBD: , // data type: Date (chua check neu khong vao db thi doi ve string format: YYYY-MM-DD HH:MM:SS)
//    NGAYKT: , // data type: Date
//    NOIDUNG: ,
//    SOBUOIDAY: ,
//    SOGIODAY: ,
//    TRANGTHAI:
//  }
// }
router.post('/registerTutor/update', async (req, res) => {
  RegisterTutorModel.update(req.body.id, req.body.value)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// end register tutor

// contract for register

// get contract data list for tutor (contract only)
// data send:
// {
//  id: , // id tutor
// }
router.post('/contract/getList', async (req, res) => {
  ContractModel.getByTutorId(req.body.id)
    .then(async result => {
      const data = await Promise.all(
        result.map(async item => {
          const detail = await RegisterTutorModel.getById(item.IDDK);
          return { ...item, CHITIET: detail[0] };
        })
      );

      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// tutor accept and make contract
// data send:
// {
//  value: {
//    IDDK: , // id of row in table dangkyhoc in db you want to make contract
//    NGAYBD: , // data type: Date (chua check neu khong vao db thi doi ve format: YYYY-MM-DD HH:MM:SS)
//    NGAYKT: , // data type: Date
//    TRANGTHAI:
//  }
// }
router.post('/contract/accept', async (req, res) => {
  await RegisterTutorModel.update(req.body.id, {
    TRANGTHAI: 1
  });

  await ContractModel.insert(req.body.value)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// delete
// data send:
// {
//  id: ,
// }
router.post('/contract/delete', async (req, res) => {
  ContractModel.delete(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// update
// data send:
// {
//  id: , // id of row in table of db
//  value: {
//    TONGTIEN: ,
//    NGAYBD: , // data type: Date (chua check neu khong vao db thi doi ve string format: YYYY-MM-DD HH:MM:SS)
//    NGAYKT: , // data type: Date
//    TRANGTHAI:
//  }
// }
router.post('/contract/update', async (req, res) => {
  ContractModel.update(req.body.id, req.body.value)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// end contract for register

module.exports = router;

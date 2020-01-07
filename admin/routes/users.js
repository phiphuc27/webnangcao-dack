const express = require('express');
const router = express.Router();
//const passport = require('passport');

const bcrypt = require('bcryptjs');

const { registerValidation, passwordValidation } = require('../validation');

var UsersModel = require('../models/Users');
var SkillModel = require('../models/Skill');
var ContractModel = require('../models/Contract');
var RegisterTutorModel = require('../models/RegisterTutor');
var ComplainModel = require('../models/Complain');
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

router.post('/getUserList', async (req, res, next) => {
  // pagnition
  var numRows;
  var numPerPage = req.body.npp || 1;
  var page = req.body.page || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  await UsersModel.countUsersOnly()
    .then(result => {
      numRows = result[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
    })
    .then(
      async () =>
        await UsersModel.getUsersOnlyPagination(limit).then(result => {
          // console.log(result);
          var responsePayload = {
            list: result
          };
          if (page < numPages) {
            responsePayload.pagination = {
              current: page,
              perPage: numPerPage,
              previous: page > 0 ? page - 1 : undefined,
              next: page < numPages - 1 ? page + 1 : undefined,
              numPages: numPages
            };
          } else
            responsePayload.pagination = {
              err:
                'queried page ' +
                page +
                ' is >= to maximum page number ' +
                numPages
            };
          res.json(responsePayload);
        })
    )
    .catch(err => {
      // console.error(err);
      res.json({ err: err });
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

// data send
// {
//  id: ,
//  KYNANG: ,
// }
router.post('/insertUserSkill', async (req, res, next) => {
  const skill = await SkillModel.findByName(req.body.skill);

  if (skill.length <= 0) {
    // skill not exist create new skill and add skill to user
    var newId;
    await SkillModel.insert({ KYNANG: req.body.skill })
      .then(result => {
        newId = result.insertId;
        SkillModel.insertUserSkill({
          IDKN: result.insertId,
          IDND: req.body.id
        }).then(result => {
          res.status(200).send({ result, newId });
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    // skill exist add skill to user
    await SkillModel.insertUserSkill({ IDKN: skill[0].ID, IDND: req.body.id })
      .then(result => {
        res.status(200).send({ result, newId: skill[0].ID });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
});

router.post('/deleteUserSkill', async (req, res, next) => {
  SkillModel.deleteUserSkill(req.body.idkn, req.body.idnd)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/changeStatusAccount', async (req, res, next) => {
  SkillModel.delete(req.body.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// manage skill

router.post('/getSkillList', async (req, res, next) => {
  // pagnition
  var numRows;
  var numPerPage = req.body.npp || 1;
  var page = req.body.page || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  await SkillModel.count()
    .then(result => {
      numRows = result[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
    })
    .then(
      async () =>
        await SkillModel.getAllSkillPagination(limit).then(result => {
          // console.log(result);
          var responsePayload = {
            list: result
          };
          if (page < numPages) {
            responsePayload.pagination = {
              current: page,
              perPage: numPerPage,
              previous: page > 0 ? page - 1 : undefined,
              next: page < numPages - 1 ? page + 1 : undefined,
              numPages: numPages
            };
          } else
            responsePayload.pagination = {
              err:
                'queried page ' +
                page +
                ' is >= to maximum page number ' +
                numPages
            };
          res.json(responsePayload);
        })
    )
    .catch(err => {
      // console.error(err);
      res.json({ err: err });
    });
});

router.post('/insertSkill', async (req, res, next) => {
  const skill = await SkillModel.findByName(req.body.skill);

  if (skill.length <= 0) {
    // skill not exist create new skill
    var newId;
    await SkillModel.insert({ KYNANG: req.body.skill })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    // skill exist return 500
    res.status(500).send('Skill aldready exist.');
  }
});

router.post('/updateSkill', async (req, res, next) => {
  await SkillModel.update(req.body.id, req.body.skill)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/deleteSkill', async (req, res, next) => {
  await SkillModel.deleteUserSkillBySkillId(req.body.id).then(result => {
    SkillModel.delete(req.body.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
});

// lock  acc
router.post('/lock', async (req, res, next) => {
  await UsersModel.updateStatus(req.body.id, 1)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// unlock  acc
router.post('/unlock', async (req, res, next) => {
  await UsersModel.updateStatus(req.body.id, 0)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// get contract data list
// data send:
// {
//  nnp: ,
//  page: ,
// }
router.post('/contract/getList', async (req, res) => {
  // pagnition
  var numRows;
  var numPerPage = req.body.npp || 1;
  var page = req.body.page || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  await ContractModel.count()
    .then(result => {
      numRows = result[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
    })
    .then(
      async () =>
        await ContractModel.getAllPagination(limit).then(async result => {
          // console.log(result);
          const data = await Promise.all(
            result.map(async item => {
              const detail = await RegisterTutorModel.getById(item.IDDK);
              const tutor = await UsersModel.getUserInfoById(detail[0].IDND);
              const student = await UsersModel.getUserInfoById(detail[0].IDNH);
              return {
                ...item,
                CHITIET: detail[0],
                GIASU: { HO: tutor[0].HO, TEN: tutor[0].TEN },
                HOCSINH: { HO: student[0].HO, TEN: student[0].TEN }
              };
            })
          );
          var responsePayload = {
            list: data
          };

          if (page < numPages) {
            responsePayload.pagination = {
              current: page,
              perPage: numPerPage,
              previous: page > 0 ? page - 1 : undefined,
              next: page < numPages - 1 ? page + 1 : undefined,
              numPages: numPages
            };
          } else
            responsePayload.pagination = {
              err:
                'queried page ' +
                page +
                ' is >= to maximum page number ' +
                numPages
            };
          res.json(responsePayload);
        })
    )
    .catch(err => {
      // console.error(err);
      res.json({ err: err });
    });
});

// get complain data list
// data send:
// {
//  nnp: ,
//  page: ,
// }
router.post('/complain/getList', async (req, res) => {
  // pagnition
  var numRows;
  var numPerPage = req.body.npp || 1;
  var page = req.body.page || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  await ComplainModel.count()
    .then(result => {
      numRows = result[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
    })
    .then(
      async () =>
        await ComplainModel.getAllPagination(limit).then(async result => {
          // console.log(result);
          const data = await Promise.all(
            result.map(async item => {
              const tutor = await UsersModel.getUserInfoById(item.IDND);
              const student = await UsersModel.getUserInfoById(item.IDNH);
              return {
                ...item,
                GIASU: { HO: tutor[0].HO, TEN: tutor[0].TEN },
                HOCSINH: { HO: student[0].HO, TEN: student[0].TEN }
              };
            })
          );
          var responsePayload = {
            list: data
          };

          if (page < numPages) {
            responsePayload.pagination = {
              current: page,
              perPage: numPerPage,
              previous: page > 0 ? page - 1 : undefined,
              next: page < numPages - 1 ? page + 1 : undefined,
              numPages: numPages
            };
          } else
            responsePayload.pagination = {
              err:
                'queried page ' +
                page +
                ' is >= to maximum page number ' +
                numPages
            };
          res.json(responsePayload);
        })
    )
    .catch(err => {
      // console.error(err);
      res.json({ err: err });
    });
});

module.exports = router;

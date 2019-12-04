var express = require('express');
var router = express.Router();
const passport = require('passport');
const utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = utils.generateToken(req.user.ID);
    res.json({ user: req.user, token: token });
  }
);

module.exports = router;

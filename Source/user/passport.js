const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;

const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcryptjs');

const UsersModel = require('./models/Users');
const SkillModel = require('./models/Skill');
// const db = require('./db');

require('dotenv').config();

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	db.findProfileById(id)
// 		.then(user => {
// 			done(null, user);
// 		})
// 		.catch(err => {
// 			done(err);
// 		});
// });

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, cb) => {
      try {
        return UsersModel.findByEmail(email)
          .then(async user => {
            if (!user[0]) {
              return cb(null, false, {
                message: 'Email hoặc mật khẩu không đúng.'
              });
            }
            // checking password
            const validPassword = await bcrypt.compare(
              password,
              user[0].MATKHAU
            );
            if (!validPassword)
              return cb(null, false, {
                message: 'Email hoặc mật khẩu không đúng.'
              });

            return cb(null, user[0], { message: 'Logged In Successfully' });
          })
          .catch(err => {
            console.log(err);
            cb(err);
          });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    // find the user in db if needed
    return UsersModel.getUserInfoById(jwtPayload._id)
      .then(async user => {
        const tmpTutor = { ...user[0] };
        const skills = await SkillModel.getSkillByUserId(tmpTutor.ID);
        const newTutor = { ...tmpTutor, KYNANG: [...skills] };
        return cb(null, newTutor);
      })
      .catch(err => {
        return cb(err);
      });
  })
);

const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config/config');

const bcrypt = require('bcryptjs');
var UsersModel = require('./models/Users');
//const db = require('./db');

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

//Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, cb) => {
      try {
        console.log(username);
        return UsersModel.findByUsername(username)
          .then(async user => {
            if (!user[0]) {
              return cb(null, false, {
                message: 'Incorrect email or password.'
              });
            }
            // checking password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
              return cb(null, false, {
                message: 'Incorrect email or password.'
              });

            return cb(null, user, { message: 'Logged In Successfully' });
          })
          .catch(err => {
            cb(err);
          });
      } catch (err) {
        cb(err);
      }
    }
  )
);

//JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_KEY
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    //find the user in db if needed
    return await UsersModel.getUserById(jwtPayload._id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  })
);

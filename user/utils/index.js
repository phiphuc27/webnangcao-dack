const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(id) {
  const token = jwt.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  return token;
}

function getCleanUser(user) {
  if (!user) return {};

  const u = user.toJSON();
  return {
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    birthday: u.birth_day,
    gender: u.gender,
    phone: u.phone,
    email: u.email,
    createdAt: u.create_time,
    updatedAt: u.modification_time,
    image: u.avatarURL,
    google_id: u.google_id,
    facebook_id: u.facebook_id
  };
}

module.exports = {
  getCleanUser,
  generateToken
};

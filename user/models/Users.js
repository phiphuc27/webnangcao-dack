var db = require('../db/index');

var Users = {
  findByUsername: function(username) {
    var sql = `select * from nguoidung_taikhoan where TENTK = '${username}'`;
    return db.load(sql);
  },
  getAllUsers: function() {
    var sql = `Select * from nguoidung_taikhoan`;
    return db.load(sql);
  },
  getUserById: function(id) {
    var sql = `select * from nguoidung_taikhoan where ID='${id}'`;
    return db.load(sql);
  },
  insert: function(user) {
    var sql = `insert into nguoidung_taikhoan set ? `;
    return db.save(sql, user);
  },
  deleteUser: function(id) {
    var sql = `delete from nguoidung_taikhoan where ID='${id}'`;
    return db.save(sql);
  },
  updatePassword: function(id, password) {
    var sql = `update nguoidung_taikhoan set MATKHAU='${password}' where ID='${id}'`;
    return db.save(sql);
  },
  isExist: function(username, password) {
    var sql = `Select * from nguoidung_taikhoan where TENTK='${username}' and MATKHAU='${password}'`;
    return db.load(sql);
  },
  checkEmailExist: function(email) {
    var sql = `select count(if(EMAIL='${email}',1,null)) as emailExist from nguoidung_taikhoan`;
    return db.load(sql)[0].emailExist;
  },
  findByEmail: function(email) {
    var sql = `select * from nguoidung_taikhoan where EMAIL = '${email}'`;
    return db.load(sql)[0];
  },
  updateProfile: function(user, id) {
    var sql = `update nguoidung_taikhoan set ? where ID = ${id} `;
    return db.save(sql, user);
  }
};
module.exports = Users;

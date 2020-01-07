var db = require('../db/index');

var Users = {
  getAllUsers: function() {
    var sql = `Select * from taikhoan`;
    return db.load(sql);
  },
  countUsersOnly: function() {
    var sql = `Select count(*) as numRows from taikhoan where LOAI=2 or LOAI=3`;
    return db.load(sql);
  },
  getUsersOnly: function() {
    var sql = `Select * from taikhoan where LOAI=2 or LOAI=3`;
    return db.load(sql);
  },
  getUsersOnlyPagination: function(limit) {
    var sql = `Select * from taikhoan where LOAI=2 or LOAI=3 ORDER BY ID ASC LIMIT ${limit}`;
    return db.load(sql);
  },
  getUserById: function(id) {
    var sql = `select * from taikhoan where ID='${id}'`;
    return db.load(sql);
  },
  getUserInfoById: function(id) {
    var sql = `select * from taikhoan u join thongtin i on u.ID = i.ID where u.ID='${id}'`;
    return db.load(sql);
  },
  insert: function(user) {
    var sql = `insert into taikhoan set ? `;
    return db.save(sql, user);
  },
  deleteUser: function(id) {
    var sql = `delete from taikhoan where ID='${id}'`;
    return db.save(sql);
  },
  updatePassword: function(id, password) {
    var sql = `update taikhoan set MATKHAU='${password}' where ID='${id}'`;
    return db.save(sql);
  },
  updateStatus(id, status) {
    const sql = `update taikhoan set TRANGTHAI='${status}' where ID='${id}'`;
    return db.save(sql);
  },
  isExist: function(email, password) {
    var sql = `Select * from taikhoan where EMAIL='${email}' and MATKHAU='${password}'`;
    return db.load(sql);
  },
  checkEmailExist: function(email) {
    var sql = `select count(if(EMAIL='${email}',1,null)) as emailExist from taikhoan`;
    return db.load(sql)[0].emailExist;
  },
  findByEmail: function(email) {
    var sql = `select * from taikhoan where EMAIL = '${email}'`;
    return db.load(sql);
  },
  insertProfile: function(profile) {
    var sql = `insert into thongtin set ? `;
    return db.save(sql, profile);
  },
  updateProfile: function(user, id) {
    var sql = `update thongtin set ? where ID = ${id} `;
    return db.save(sql, user);
  },
  findProfileById: function(id) {
    var sql = `select * from taikhoan u join thongtin i on u.ID = i.ID where u.ID = ${id}`;
    return db.load(sql);
  }
};
module.exports = Users;

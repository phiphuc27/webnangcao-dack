const db = require('../db/index');

const Users = {
  getAllUsers() {
    const sql = `Select * from taikhoan`;
    return db.load(sql);
  },
  getUserById(id) {
    const sql = `select * from taikhoan where ID='${id}'`;
    return db.load(sql);
  },
  getUserInfoById(id) {
    const sql = `select * from taikhoan u join thongtin i on u.ID = i.ID where u.ID='${id}'`;
    return db.load(sql);
  },
  insert(user) {
    const sql = `insert into taikhoan set ? `;
    return db.save(sql, user);
  },
  updateStatus(id, status) {
    const sql = `update taikhoan set TRANGTHAI='${status}' where ID='${id}'`;
    return db.save(sql);
  },
  deleteUser(id) {
    const sql = `delete from taikhoan where ID='${id}'`;
    return db.save(sql);
  },
  updatePassword(id, password) {
    const sql = `update taikhoan set MATKHAU='${password}' where ID='${id}'`;
    return db.save(sql);
  },
  updateType(id, type) {
    const sql = `update taikhoan set LOAI='${type}' where ID='${id}'`;
    return db.save(sql);
  },
  isExist(email, password) {
    const sql = `Select * from taikhoan where EMAIL='${email}' and MATKHAU='${password}'`;
    return db.load(sql);
  },
  checkEmailExist(email) {
    console.log('check email exists');
    const sql = `select count(if(EMAIL='${email}',1,null)) as emailExist from taikhoan`;
    return db.load(sql);
  },
  findByEmail(email) {
    console.log('get user');
    const sql = `select * from taikhoan where EMAIL = '${email}'`;
    return db.load(sql);
  },
  insertProfile(profile) {
    const sql = `insert into thongtin set ? `;
    return db.save(sql, profile);
  },
  updateProfile(user, id) {
    const sql = `update thongtin set ? where ID = ${id} `;
    return db.save(sql, user);
  },
  findProfileById(id) {
    const sql = `select * from taikhoan u join thongtin i on u.ID = i.ID where u.ID = ${id}`;
    return db.load(sql);
  },
  registerTutor(value) {
    const sql = `insert into dangkyhoc set ? `;
    return db.save(sql, value);
  }
};
module.exports = Users;

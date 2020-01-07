const db = require('../db/index');

const registerTutor = {
  getAll() {
    const sql = `Select * from dangkyhoc`;
    return db.load(sql);
  },
  getById(id) {
    const sql = `select * from dangkyhoc where ID='${id}'`;
    return db.load(sql);
  },
  getByTutorId(id) {
    const sql = `select u.*, i.HO, i.TEN from dangkyhoc u join thongtin i on u.IDNH = i.ID where IDND='${id}'`;
    return db.load(sql);
  },
  getByStudentId(id) {
    const sql = `select u.*, i.HO, i.TEN from dangkyhoc u join thongtin i on u.IDND = i.ID where IDNH='${id}'`;
    return db.load(sql);
  },
  insert(value) {
    const sql = `insert into dangkyhoc set ? `;
    return db.save(sql, value);
  },
  delete(id) {
    const sql = `delete from dangkyhoc where ID='${id}'`;
    return db.save(sql);
  },
  update(id, value) {
    const sql = `update dangkyhoc set ? where ID='${id}'`;
    return db.save(sql, value);
  }
};
module.exports = registerTutor;

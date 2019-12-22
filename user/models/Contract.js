const db = require('../db/index');

const contract = {
  getAll() {
    const sql = `Select * from hopdonghoc`;
    return db.load(sql);
  },
  getById(id) {
    const sql = `select * from hopdonghoc where ID='${id}'`;
    return db.load(sql);
  },
  getByTutorId(id) {
    const sql = `select u.* from hopdonghoc u join dangkyhoc i on u.IDDK = i.ID where i.IDND='${id}'`;
    return db.load(sql);
  },
  getByStudentId(id) {
    const sql = `select u.* from hopdonghoc u join dangkyhoc i on u.IDDK = i.ID where i.IDNH='${id}'`;
    return db.load(sql);
  },
  insert(value) {
    const sql = `insert into hopdonghoc set ? `;
    return db.save(sql, value);
  },
  delete(id) {
    const sql = `delete from hopdonghoc where ID='${id}'`;
    return db.save(sql);
  },
  update(id, value) {
    const sql = `update hopdonghoc set ? where ID='${id}'`;
    return db.save(sql, value);
  }
};
module.exports = contract;

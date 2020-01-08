const db = require('../db/index');

const contract = {
  getAll() {
    const sql = `Select * from khieunai`;
    return db.load(sql);
  },
  count: function() {
    var sql = `Select count(*) as numRows from khieunai`;
    return db.load(sql);
  },
  getById(id) {
    const sql = `select * from khieunai where ID='${id}'`;
    return db.load(sql);
  },
  getAllPagination(limit) {
    const sql = `select * from khieunai ORDER BY ID DESC LIMIT ${limit}`;
    return db.load(sql);
  },
  insert(value) {
    const sql = `insert into khieunai set ? `;
    return db.save(sql, value);
  },
  delete(id) {
    const sql = `delete from khieunai where ID='${id}'`;
    return db.save(sql);
  },
  update(id, value) {
    const sql = `update khieunai set ? where ID='${id}'`;
    return db.save(sql, value);
  },
  updateStatus(id, status) {
    const sql = `update khieunai set TRANGTHAI='${status}' where ID='${id}'`;
    return db.save(sql);
  }
};
module.exports = contract;

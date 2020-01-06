const db = require('../db/index');

const chat = {
  getAll() {
    const sql = `Select * from chat`;
    return db.load(sql);
  },
  getById(sendID, receiveID) {
    const sql = `select * from chat where (IDG='${sendID}' and IDN='${receiveID}') or (IDG='${receiveID}' and IDN='${sendID}')`;
    return db.load(sql);
  },
  insert(value) {
    const sql = `insert into chat set ? `;
    return db.save(sql, value);
  },
  delete(id) {
    const sql = `delete from chat where ID='${id}'`;
    return db.save(sql);
  },
  update(id, value) {
    const sql = `update chat set ? where ID='${id}'`;
    return db.save(sql, value);
  }
};
module.exports = chat;

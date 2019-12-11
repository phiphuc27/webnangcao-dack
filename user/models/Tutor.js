const db = require('../db/index');

const Tutor = {
  getAllTutor() {
    const sql = `select * from thongtin i join taikhoan u on i.ID = u.ID where u.LOAI=2`;
    return db.load(sql);
  },
  getTutorByID(id) {
    const sql = `select * from thongtin i join taikhoan u on i.ID = u.ID where u.LOAI=2 && u.ID='${id}'`;
    return db.load(sql);
  }
};

module.exports = Tutor;
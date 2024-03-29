const db = require('../db/index');

const Tutor = {
  getAllTutor() {
    const sql = `select * from thongtin i join taikhoan u on i.ID = u.ID where u.LOAI=2`;
    return db.load(sql);
  },
  getTutorByID(id) {
    const sql = `select * from thongtin i join taikhoan u on i.ID = u.ID where u.LOAI=2 && u.ID='${id}'`;
    return db.load(sql);
  },
  getReviewByTutorID(id) {
    const sql = `select u.*, i.HO, i.TEN, i.AVATARURL from danhgia u join thongtin i on u.IDNH = i.ID where u.IDND='${id}'`;
    return db.load(sql);
  },
  insertReview(review) {
    const sql = `insert into danhgia set ? `;
    return db.save(sql, review);
  },
  insertRefund(refund) {
    const sql = `insert into khieunai set ? `;
    return db.save(sql, refund);
  }
};

module.exports = Tutor;

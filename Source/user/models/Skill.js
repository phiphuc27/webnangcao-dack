const db = require('../db/index');

const Skill = {
  getAllSkill() {
    const sql = `Select * from kynang`;
    return db.load(sql);
  },
  getSkillByName(name) {
    const sql = `Select * from kynang where KYNANG='${name}'`;
    return db.load(sql);
  },
  getSkillByUserId(id) {
    const sql = `select * from kynang_nguoidung u join kynang i on u.IDKN=i.ID where u.IDND='${id}'`;
    return db.load(sql);
  },
  checkSkillExist(idnd, idkn) {
    const sql = `select * from kynang_nguoidung u join kynang i on u.IDKN=i.ID where i.ID='${idkn}' && u.IDND='${idnd}'`;
    return db.load(sql);
  },
  insert(skill) {
    const sql = `insert into kynang_nguoidung set ? `;
    return db.save(sql, skill);
  },
  insertSkill(skill) {
    const sql = `insert into kynang(KYNANG) values ? `;
    return db.save(sql, skill);
  },
  delete(id, idnd) {
    const sql = `delete from kynang_nguoidung where IDKN='${id}' && IDND='${idnd}'`;
    return db.save(sql);
  },
  update(id, skill) {
    const sql = `update kynang set KYNANG='${skill}' where ID='${id}'`;
    return db.save(sql);
  }
};
module.exports = Skill;

const db = require('../db/index');

const Skill = {
  getAllSkill() {
    const sql = `Select * from kynang`;
    return db.load(sql);
  },
  getSkillByUserId(id) {
    const sql = `select * from kynang_nguoidung u join kynang i on u.IDKN=i.ID where u.IDND='${id}'`;
    return db.load(sql);
  },
  insert(skill) {
    const sql = `insert into kynang set ? `;
    return db.save(sql, skill);
  },
  insertSkill(skill) {
    const sql = `insert into kynang(KYNANG) values ? `;
    return db.save(sql, skill);
  },
  delete(id) {
    const sql = `delete from kynang where ID='${id}'`;
    return db.save(sql);
  },
  update(id, skill) {
    const sql = `update kynang set KYNANG='${skill}' where ID='${id}'`;
    return db.save(sql);
  }
};
module.exports = Skill;

var db = require('../db/index');

var Skill = {
  getAllSkill: function() {
    var sql = `Select * from kynang`;
    return db.load(sql);
  },
  count: function(id) {
    var sql = `Select count(*) as numRows from kynang`;
    return db.load(sql);
  },
  getAllSkillPagination: function(limit) {
    var sql = `Select * from kynang ORDER BY ID ASC LIMIT ${limit}`;
    return db.load(sql);
  },
  getSkillByUserId: function(id) {
    var sql = `select * from kynang_nguoidung u join kynang i on u.IDKN=i.ID where u.IDND='${id}'`;
    return db.load(sql);
  },
  getTutorBySkillId: function(id) {
    var sql = `select IDND as ID from kynang_nguoidung where IDKN='${id}'`;
    return db.load(sql);
  },
  findByName: function(skill) {
    var sql = `select * from kynang where KYNANG='${skill}'`;
    return db.load(sql);
  },
  insert: function(skill) {
    var sql = `insert into kynang set ? `;
    return db.save(sql, skill);
  },
  insertUserSkill: function(skill) {
    const sql = `insert into kynang_nguoidung set ? `;
    return db.save(sql, skill);
  },
  delete: function(id) {
    var sql = `delete from kynang where ID='${id}'`;
    return db.save(sql);
  },
  deleteUserSkill: function(idkn, idnd) {
    var sql = `delete from kynang_nguoidung where IDKN='${idkn}' and IDND='${idnd}'`;
    return db.save(sql);
  },

  deleteUserSkillBySkillId: function(id) {
    var sql = `delete from kynang_nguoidung where IDKN='${id}'`;
    return db.save(sql);
  },
  update: function(id, skill) {
    var sql = `update kynang set KYNANG='${skill}' where ID='${id}'`;
    return db.save(sql);
  }
};
module.exports = Skill;

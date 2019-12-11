var db = require('../db/index');

var Skill = {
  getAllSkill: function() {
    var sql = `Select * from kynang`;
    return db.load(sql);
  },
  getSkillByUserId: function(id) {
    var sql = `select * from kynang where IDND='${id}'`;
    return db.load(sql);
  },
  insert: function(skill) {
    var sql = `insert into kynang set ? `;
    return db.save(sql, skill);
  },
  delete: function(id) {
    var sql = `delete from kynang where ID='${id}'`;
    return db.save(sql);
  },
  update: function(id, skill) {
    var sql = `update kynang set KYNANG='${skill}' where ID='${id}'`;
    return db.save(sql);
  }
};
module.exports = Skill;

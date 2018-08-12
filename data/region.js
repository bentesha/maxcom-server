const db = require('../db');
const shortid = require('shortid');
const assert = require('assert');

const TABLE = 'regions';

module.exports = {
  getAll(){
    return db.from(TABLE)
      .select();
  },

  getById(id){
    assert(typeof id === 'string', 'Id must be a valid string value');
    return db.from(TABLE)
      .where({ id })
      .select()
      .first();
  },

  async create(name, paths) {
    assert(typeof name === 'string', 'name must be a valid string value');
    assert(typeof paths === 'string', 'paths must be a valid string value');
    attributes = {
      id: shortid(),
      name,
      paths
    };
    return db.into(TABLE).insert(attributes).then(() => {
      return attributes.id;
    });
  },

  async update(id, paths){
    assert(typeof id === 'string', 'id must be a valid string value');
    assert(typeof paths === 'string', 'paths must be a valid string value');
    return db.from(TABLE)
      .where({ id })
      .update({ paths })
      .then(() => {
        return id;
      });
  },

  async delete(id){
    assert(typeof id === 'string', 'id must be a valid string value');
    return db.from(TABLE)
      .where({ id })
      .delete()
      .then(() => {
        return id;
      });
  }
};


const shortid = require('shortid');
const db = require('../db');
const assert = require('assert');

const TABLE = 'users';

module.exports = {
  async getById(id){
    assert(typeof id === 'string', 'id must be a valid string value');
    return db.from(TABLE)
      .where({ id })
      .select()
      .first()
      .then(user => user || null);
  },

  async getByPhone(phone) {
    assert(typeof phone === 'string', 'phone must be a valid string value');
    return db.from(TABLE)
      .where({ phone })
      .select()
      .first()
      .then(user => user || null);
  },

  async getAll(){
    return db.from(TABLE)
      select();
  },

  async create(name, phone, password, region){
    assert(typeof name === 'string', 'name must be a valid string value');
    assert(typeof phone === 'string', 'phone must be a valid string value');
    assert(typeof password === 'string', 'password must be a valid string value');
    assert(typeof region === 'string', 'region must be a valid string value');

    const id = shortid();
    return db.into(TABLE)
      .insert({
        id,
        name,
        phone,
        password,
        region
      })
      .then(() => {
        return this.getById(id);
      });
  },

  async delete(id){
    assert(typeof id === 'string', 'id must be a valid string value');
    return db.from(TABLE)
      .where({ id })
      .delete()
      .then(() => {
        return  id;
      });
  }
}
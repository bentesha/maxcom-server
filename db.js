const knexFile = require('./knexfile');
const knex = require('knex');

module.exports = knex(knexFile.development);

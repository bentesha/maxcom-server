
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.string('password').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  
};

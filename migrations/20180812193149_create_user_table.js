
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('region').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

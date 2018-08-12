
exports.up = function(knex, Promise) {
  return knex.schema.createTable('regions', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('path').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('regions');
};


exports.up = function(knex, Promise) {
  return knex.schema.alterTable('regions', table => {
    table.renameColumn('path', 'paths');
  })
};

exports.down = function(knex, Promise) {
  
};

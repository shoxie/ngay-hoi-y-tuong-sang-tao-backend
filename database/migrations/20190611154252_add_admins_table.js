exports.up = function(knex) {
  return knex.schema.createTable('admins', table => {
		table.increments('id').unsigned().primary();
		table.string('email', 64).notNullable().unique();
		table.string('password', 64).notNullable();
		table.string('name', 64).notNullable();
		table.timestamp('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admins');
};

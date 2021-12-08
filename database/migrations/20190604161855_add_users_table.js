exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
		table.increments('id').unsigned().primary();
		table.string('email', 64).notNullable().unique();
		table.string('password', 64).notNullable();
		table.string('name', 64).notNullable();
		table.enu('acc_status', ['PENDING', 'ACTIVE', 'INACTIVE']).notNullable();
		table.timestamp('created_at').notNullable();
		// table.integer('points').unsigned().notNullable();
		// table.string('cpf', 256).notNullable();
		// table.foreign('discarded_electronics').references('electronics.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

/* Knex cheatsheet
Create knexfile.js
	./node_modules/.bin/knex init
	or
	yarn run knex init --cwd ./database

Create a migration
	yarn run knex migrate:make migration_name --cwd ./database
	yarn knex migrate:make migration_name --env production --cwd ./database

Run migrations
	yarn run knex migrate:latest --cwd ./database
	yarn run knex migrate:latest --env production --cwd ./database

Rollback
	yarn run knex migrate:rollback --cwd ./database
	yarn run knex migrate:rollback --env production --cwd ./database
*/
// connection: 'postgres://user:password@localhost:5432/dbname'
// Run migrations with '--cwd ./database' if the knexfile is within the database folder

const databaseUrl = process.env.DATABASE_URL || 'postgres://sindelio:password@localhost:5432/test_users';

module.exports = {
  development: {
    client: 'pg',
    connection: databaseUrl,
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    // seeds: {
    //   directory: './database/seeds/dev'
    // },
    // useNullAsDefault: true
  },
  production: {

  },
};


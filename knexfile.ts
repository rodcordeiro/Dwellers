


// Update with your config settings.

export const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dwellers.sqlite3',
    },
    migrations: {
      directory: `./src/database/migrations`,
    },
    seeds: {
      directory: `./src/database/seeds`,
    },
    useNullAsDefault: true,
  },

  
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

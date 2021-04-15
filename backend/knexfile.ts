require('dotenv/config');

module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : 'localhost',
      port: 3306,
      user : process.env.KNEX_USER,
      password : process.env.KNEX_PASSWORD,
      database : process.env.KNEX_DATABASE,
    },
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: './src/database/migrations'
    },
    seeds: {
      extension: 'ts',
      directory: './src/database/seeds'
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      extension: 'ts',
      directory: './src/database/migrations'
    },
    seeds: {
      extension: 'ts',
      directory: './src/database/seeds'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
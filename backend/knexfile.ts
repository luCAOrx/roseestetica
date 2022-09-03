require('dotenv/config')

module.exports = {

  development: {
    client: 'pg',
    version: '14.4',
    connection: {
      host: process.env.KNEX_HOST,
      port: process.env.KNEX_PORT,
      user: process.env.KNEX_USER,
      password: process.env.KNEX_PASSWORD,
      database: process.env.KNEX_DATABASE
    },
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: './src/database/migrations'
    },
    seeds: {
      extension: 'ts',
      directory: './src/database/seeds'
    }
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
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
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
    client: 'pg',
    version: '14.4',
    connection: {
      host: process.env.RDS_HOST,
      port: process.env.RDS_PORT,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
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
    pool: {
      min: 1,
      max: 1
    }
  }
}

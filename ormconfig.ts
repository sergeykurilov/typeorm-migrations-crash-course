import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const config: SqliteConnectionOptions = {
  database: 'db',
  type: 'sqlite',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;

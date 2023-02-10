import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Dweller } from './entities/Dweller';
import { Building } from './entities/Buildings';
import { Job } from './entities/Jobs';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `${__dirname}/../dwellers.sqlite3`,
  synchronize: true,
  logging: false,
  entities: [Dweller, Building, Job],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  subscribers: [],
});

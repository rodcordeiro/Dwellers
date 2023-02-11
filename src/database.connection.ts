import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Dweller } from './entities/Dweller';
import { Building } from './entities/Buildings';
import { Job } from './entities/Jobs';
import { Assignment } from './entities/Assignment';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `${__dirname}/../dwellers.sqlite3`,
  synchronize: true,
  logging: false,
  entities: [Dweller, Building, Job, Assignment],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  subscribers: [],
});

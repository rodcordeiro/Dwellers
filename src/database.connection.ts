import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Dweller } from './entities/Dweller';
import { Building } from './entities/Buildings';
import { Job } from './entities/Jobs';
import { Assignment } from './entities/Assignment';

const db_name = process.env.NODE_ENV === 'test' ? 'test' : 'dwellers';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `${__dirname}/../${db_name}.sqlite3`,
  synchronize: true,
  logging: false,
  entities: [Dweller, Building, Job, Assignment],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  subscribers: [],
});

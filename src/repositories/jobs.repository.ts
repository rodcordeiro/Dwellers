import { AppDataSource } from '../database.connection';
import { Job } from '../entities/Jobs';

export const jobRepository = AppDataSource.getRepository(Job);

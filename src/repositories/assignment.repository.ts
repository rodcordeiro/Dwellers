import { Assignment } from '../entities/Assignment';
import { AppDataSource } from '../database.connection';

export const assignRepository = AppDataSource.getRepository(Assignment);

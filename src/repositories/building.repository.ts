import { AppDataSource } from '../database.connection';
import { Building } from '../entities/Buildings';

export const buildingRepository = AppDataSource.getRepository(Building);

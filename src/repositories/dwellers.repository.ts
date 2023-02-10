import { AppDataSource } from '../database.connection';
import { Dweller } from '../entities/Dweller';

export const dwellerRepository = AppDataSource.getRepository(Dweller);

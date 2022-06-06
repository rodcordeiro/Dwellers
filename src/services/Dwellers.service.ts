import { BaseService } from './base.service';
import { v4 as uuid } from 'uuid';

export interface IDweller {
  id?: string;
  name: string;
  father?: string;
  mother?: string;
  Strength: number;
  Perception: number;
  Endurance: number;
  Charisma: number;
  Intelligence: number;
  Agility: number;
  Luck: number;
  born: Date;
  updatedAt: Date;
}

export class Dweller extends BaseService {
  constructor() {
    super();
    this.connection = super.connection;
  }
  view() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection('dwellers')
          .select('*')
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  create() {}
  update() {}
  delete() {}
  findById(id: string) {}
  findChilds() {}
  findParents() {}
}

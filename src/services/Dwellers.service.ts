import { Knex } from 'knex';
import Conn from '../database';
import { v4 as uuid } from 'uuid';

export interface IDweller {
  id?: string;
  name: string;
  lvl: number;
  gender: string;
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
  job?: string;
}

export class Dweller {
  private connection;
  constructor() {
    this.connection = Conn();
  }
  public close() {
    // logger.debug(`closing connection to ${this.database}`);
    this.connection.destroy();
  }
  view(): Promise<IDweller[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection('dwellers')
          .select(
            'id',
            'name',
            'father',
            'mother',
            'Strength',
            'Perception',
            'Endurance',
            'Charisma',
            'Intelligence',
            'Agility',
            'Luck',
            'born',
            'updatedAt',
          )
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  create(
    name: string,
    Strength: number,
    Perception: number,
    Endurance: number,
    Charisma: number,
    Intelligence: number,
    Agility: number,
    Luck: number,
    born: Date,
    updatedAt: Date,
    father?: string,
    mother?: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (father) {
          await this.findById(father).catch((err) => reject(err));
        }
        if (mother) {
          await this.findById(mother).catch((err) => reject(err));
        }
        const id = uuid();
        await this.connection('dwellers')
          .insert({
            id,
            name,
            Strength,
            Perception,
            Endurance,
            Charisma,
            Intelligence,
            Agility,
            Luck,
            born,
            updatedAt,
            father,
            mother,
          })
          .then((_response) => {
            resolve({
              id,
              name,
            });
          })
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  update() {}
  delete() {}
  findById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection('dwellers')
          .select(
            'id',
            'name',
            'father',
            'mother',
            'Strength',
            'Perception',
            'Endurance',
            'Charisma',
            'Intelligence',
            'Agility',
            'Luck',
            'born',
            'updatedAt',
          )
          .where({ id })
          .first()
          .then((response) => {
            if (response.length > 0) return resolve(response);
            reject('Invalid ID');
          })
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  findChilds() {}
  findParents() {}
}

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
        await this.connection
          .raw(
            'SELECT a.id, a.name, a.lvl, a.Strength, a.Perception, a.Endurance, a.Charisma, a.Intelligence, a.Agility, a.Luck, a.gender, a.bornAt, b.name as father, c.name as mother,e.name as job, a.updateAt FROM dwellers a  LEFT JOIN dwellers b on a.id = b.father LEFT JOIN dwellers c on a.id = c.mother LEFT JOIN assignment d on a.id = d.dweller JOIN job e on e.id = d.job ORDER BY a.name ASC,a.lvl DESC',
          )
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  getDwellers(): Promise<IDweller[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection
          .raw(
            'SELECT a.id, a.name,a.gender FROM dwellers a ORDER BY a.name ASC',
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
    lvl: number,
    gender: string,
    Strength: number,
    Perception: number,
    Endurance: number,
    Charisma: number,
    Intelligence: number,
    Agility: number,
    Luck: number,
    bornAt: string,
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
            lvl,
            gender,
            Strength,
            Perception,
            Endurance,
            Charisma,
            Intelligence,
            Agility,
            Luck,
            bornAt,
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
            'bornAt',
            'updateAt',
          )
          .where({ id })
          .first()
          .then((response) => {
            if (response) return resolve(response);
            return reject('Invalid ID');
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

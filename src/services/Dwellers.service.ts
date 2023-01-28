/* eslint-disable @typescript-eslint/ban-ts-comment */
import Conn from '../database/index.js';
import { v4 as uuid } from 'uuid';
import { Dweller } from '../utils/interface.js';

export class DwellerService {
  private connection;
  constructor() {
    this.connection = Conn();
  }
  close() {
    // logger.debug(`closing connection to ${this.database}`);
    this.connection.destroy();
  }
  view(filters?: { id?: string }): Promise<Dweller[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT a.id, a.name, a.lvl, a.Strength, a.Perception, a.Endurance, a.Charisma, a.Intelligence, a.Agility, a.Luck, a.gender, a.bornAt, b.name as father, c.name as mother,e.name as job, a.updateAt FROM dwellers a  LEFT JOIN dwellers b on a.id = b.father LEFT JOIN dwellers c on a.id = c.mother LEFT JOIN assignment d on a.id = d.dweller LEFT JOIN job e on e.id = d.job ${
          filters?.id ? "WHERE A.id ='" + filters.id + "'" : ''
        } ORDER BY a.name ASC,a.lvl DESC`;
        // console.log(query);
        await this.connection
          .raw(query)
          .then((response: any[]) => {
            resolve(
              // @ts-ignore
              response.map((dweller: any) =>
                Object.fromEntries(
                  Object.entries(dweller).map((item) => [
                    item[0],
                    item[1] ?? '',
                  ]),
                ),
              ),
            );
          })
          .catch((err: Error) => reject(err.message))
          .finally(() => this.close());
      } catch (err) {
        reject(err);
      }
    });
  }
  getMale(): Promise<{ id: string; name: string }[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection
          .select('id', 'name')
          .from('dwellers')
          .where('gender', '=', 'M')
          .orderBy('name', 'asc')
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  getFemale(): Promise<{ id: string; name: string }[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection
          .select('id', 'name')
          .from('dwellers')
          .where('gender', '=', 'F')
          .orderBy('name', 'asc')
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message));
      } catch (err) {
        reject(err);
      }
    });
  }
  async create(dweller: Dweller): Promise<{ id: string }> {
    //
    return new Promise(async (resolve, reject) => {
      try {
        if (dweller.father) {
          await this.findById(dweller.father).catch((err) => reject(err));
        }
        if (dweller.mother) {
          await this.findById(dweller.mother).catch((err) => reject(err));
        }
        const id = uuid();
        const bornAt = new Date().toISOString();
        const {
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
          father,
          mother,
        } = dweller;
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
          .then((_response: any) => {
            resolve({
              id,
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
          .then((response: Dweller) => {
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

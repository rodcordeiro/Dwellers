import { Knex } from "knex";
import Conn from "../database";
import { v4 as uuid } from "uuid";
import { Dweller } from "../utils/interface";

export class DwellerService {
  private connection;
  constructor() {
    this.connection = Conn();
  }
  private close() {
    // logger.debug(`closing connection to ${this.database}`);
    this.connection.destroy();
  }
  view(): Promise<Dweller[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connection
          .raw(
            "SELECT a.id, a.name, a.lvl, a.Strength, a.Perception, a.Endurance, a.Charisma, a.Intelligence, a.Agility, a.Luck, a.gender, a.bornAt, b.name as father, c.name as mother,e.name as job, a.updateAt FROM dwellers a  LEFT JOIN dwellers b on a.id = b.father LEFT JOIN dwellers c on a.id = c.mother LEFT JOIN assignment d on a.id = d.dweller JOIN job e on e.id = d.job ORDER BY a.name ASC,a.lvl DESC"
          )
          .then((response) => resolve(response))
          .catch((err: Error) => reject(err.message))
          .finally(() => this.close());
      } catch (err) {
        reject(err);
      }
    });
  }
}

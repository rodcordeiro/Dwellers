import { Knex } from 'knex';
import Conn from '../database';

export class BaseService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected connection: Knex<any, unknown[]>;
  constructor() {
    // logger.debug(`Stablishing connection to ${database}`);
    this.connection = Conn();
  }
  public close() {
    // logger.debug(`closing connection to ${this.database}`);
    this.connection.destroy();
  }
}

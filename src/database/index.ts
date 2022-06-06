/* eslint-disable @typescript-eslint/ban-ts-comment */
import knex, { Knex } from 'knex';
import configuration from '../../knexfile';
import dotenv from 'dotenv';

dotenv.config();

type iConfig = {
  [key: string]: {
    client: string;
    connection: Knex.MsSqlConnectionConfigBase;
    migrations: Knex.MigratorConfig;
    seeds: Knex.SeederConfig;
  };
};
//@ts-ignore
const config: iConfig = configuration[process.env.NODE_ENV];
const Conn = () => knex(config);
export default Conn;

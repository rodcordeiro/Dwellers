/* eslint-disable @typescript-eslint/ban-ts-comment */
import knex, { Knex } from 'knex';
import configuration from '../../knexfile';
import dotenv from 'dotenv';

dotenv.config();
type ConfigKeys = Omit<keyof typeof configuration, string>;

type iConfig = {
  [key: string]: Knex.Config<any>;
};

// @ts-ignore
const config: iConfig = configuration[String(process.env.NODE_ENV)];
const Conn = () => knex(config);
export default Conn;

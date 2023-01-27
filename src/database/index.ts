/* eslint-disable @typescript-eslint/ban-ts-comment */
import knex, { Knex } from "knex";
import { config } from "../../knexfile";
import dotenv from "dotenv";

dotenv.config();

type iConfig = {
  [key: string]: Knex.Config<any>;
};

// @ts-ignore
const configData: iConfig = config[process.env.NODE_ENV ?? "development"];
const Conn = () => knex(configData);
export default Conn;

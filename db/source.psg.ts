import { Pool } from "pg";
import config from "config";

// Configuration options for PostgreSQL


const dbSSL = config.get<boolean>("SSL");

// console.log(dbSSL);

const configOptions = {
  host: config.get<string>("HOST"),
  user: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  port: config.get<number>("DB_PORT"),
  ssl: dbSSL ? { rejectUnauthorized: false } : false,
};

export const getPoolConnectionPgs = () => {
  const pool = new Pool(configOptions);
  return pool;
};

// Example usage (remove before production):
console.log(configOptions);

import pg from 'pg-promise';
import promiseLib from 'bluebird';
import { databaseUrl } from '../config';

const options = { promiseLib };
const pgp = pg(options);

const db = pgp(databaseUrl);

export default db;
export { pgp };

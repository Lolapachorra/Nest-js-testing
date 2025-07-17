import { DataSource } from 'typeorm';
import * as path from 'path';
import {
  DB_TO_DO_DATABASE,
  DB_TO_DO_DEBUG,
  DB_TO_DO_HOST,
  DB_TO_DO_PASSWORD,
  DB_TO_DO_PORT,
  DB_TO_DO_USERNAME,
} from '../../../../config/env';
import { Task } from './entities/task';

export const toDo = new DataSource({
  type: 'postgres',
  host: DB_TO_DO_HOST,
  port: DB_TO_DO_PORT,
  username: DB_TO_DO_USERNAME,
  password: DB_TO_DO_PASSWORD,
  database: DB_TO_DO_DATABASE,
  logging: DB_TO_DO_DEBUG,
  entities: [Task],
  migrations: [path.resolve(__dirname, 'migrations', '*{.js,.ts}')],
});

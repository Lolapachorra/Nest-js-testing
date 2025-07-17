import { Log } from '@/infra/logger/log';
import { toDo } from './to-do/connection';

export const connect = async () => {
  try {
    Log.info('[DATABASE] Connecting...');

    await Promise.all([toDo.initialize()]);

    Log.info('[DATABASE] Connected.');
  } catch (error) {
    Log.error('[DATABASE] Conection error.', error);

    throw error;
  }
};

import { LoggerOptions } from 'typeorm';
import { resolve } from 'path';
import { IS_PRODUCTION } from './server';

const dir = resolve(__dirname, '..', '..');

export const DB_HOST = process.env.DB_HOST || 'db';

export const DB_PORT = Number(process.env.DB_PORT) || 5432;

export const DB_NAME = process.env.DB_NAME || 'api_eorganico';

export const DB_USER = process.env.DB_USER || 'postgres';

export const DB_PASS = process.env.DB_PASS || 'postgres';

export const DB_PATH_ENTITIES = `${dir}/infra/database/entities/*.{ts,js}`;

export const DB_PATH_MIGRATIONS = `${dir}/infra/database/migrations/*.{ts,js}`;

export const DB_PATH_SAVE_MIGRATIONS = `${dir}/infra/database/migrations`;

export const DB_PATH_SEEDS = `${dir}/infra/database/seeds/*.{ts,js}`;

export const DB_PATH_SAVE_SEEDS = `${dir}/infra/database/seeds`;

export const DB_LOGGING: LoggerOptions = ['error', 'warn', 'query'];

export const DB_SSL = IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

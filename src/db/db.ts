import { DB_TOKEN, DB_URL } from '$env/static/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate as drizzle_migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from './_schema';

const client = createClient({ url: DB_URL, authToken: DB_TOKEN });
export const db = drizzle({
	client,
	schema
});

export async function enableDefaultPragmas() {
	await Promise.all([
		db.run('PRAGMA journal_mode = WAL'),
		db.run('PRAGMA foreign_keys = ON'),
		db.run('PRAGMA synchronous = NORMAL')
	]);
}

export async function migrate() {
	await drizzle_migrate(db, { migrationsFolder: 'drizzle' });
}

export function closeDb() {
	client.close();
}

import { redirect, type Handle, type ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { closeDb, db, enableDefaultPragmas, migrate } from './db/db';

process.on('sveltekit:shutdown', () => {
	console.log('Shutting down');
	closeDb();
});

export const init: ServerInit = async () => {
	await migrate();
	await enableDefaultPragmas();
};

const initializeDb: Handle = async ({ event, resolve }) => {
	event.locals.db = db;
	return resolve(event);
};

const reroute: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		redirect(307, '/app/c');
	}
	return resolve(event);
};

export const handle = sequence(initializeDb, reroute);

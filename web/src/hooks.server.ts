import { BackbackerClient } from '$lib/backbacker/backbacker-client';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const initializeBackbacker: Handle = async ({ event, resolve }) => {
	event.locals.backbacker = new BackbackerClient({
		baseUrl: 'http://localhost:8080',
		fetch: event.fetch
	});
	return resolve(event);
};

const reroute: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		redirect(301, '/c');
	}
	return resolve(event);
};

export const handle = sequence(initializeBackbacker, reroute);

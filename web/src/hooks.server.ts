import { CrontainerClient } from '$lib/crontainer/crontainer-client';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const initializeCrontainer: Handle = async ({ event, resolve }) => {
	event.locals.crontainer = new CrontainerClient({
		baseUrl: 'http://localhost:8080',
		fetch: event.fetch
	});
	return resolve(event);
};

const reroute: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		redirect(307, '/app/c');
	}
	return resolve(event);
};

export const handle = sequence(initializeCrontainer, reroute);

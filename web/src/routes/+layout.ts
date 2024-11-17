import { CrontainerClient } from '$lib/crontainer/crontainer-client';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	const crontainer = new CrontainerClient({ baseUrl: 'http://localhost:8080', fetch });

	return {
		crontainer
	};
}) satisfies LayoutLoad;

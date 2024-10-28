import { BackbackerClient } from '$lib/backbacker/backbacker-client';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch, depends }) => {
	const backbacker = new BackbackerClient({ baseUrl: 'http://localhost:8080', fetch });
	depends('backbacker:containers');
	return { backbacker, containers: await backbacker.dockermanagement.getContainers() };
}) satisfies LayoutLoad;

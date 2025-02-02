import type { PageServerLoad } from './$types';

export const load = (async () => {
	const randy = Math.random();
	return { randy };
}) satisfies PageServerLoad;

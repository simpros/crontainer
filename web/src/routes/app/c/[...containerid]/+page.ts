import type { PageLoad } from './$types';

export const load = (async ({ parent, untrack, params }) => {
	const { crontainer } = await untrack(parent);
	if (!params.containerid) return { randy: 0 };

	const randy = Math.random();
	return { randy };
}) satisfies PageLoad;

import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { crontainer } = await parent();
	return { tasks: await crontainer.task.getTasks() };
}) satisfies PageLoad;

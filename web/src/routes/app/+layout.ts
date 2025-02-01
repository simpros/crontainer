import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { crontainer } = await parent();
	const containers = crontainer.container.getContainers();
	const tasks = crontainer.task.getAll();

	return { containers, tasks };
}) satisfies LayoutLoad;

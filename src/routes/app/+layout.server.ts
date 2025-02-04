import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { db, dockerode } }) => {
	const containers = dockerode.listContainers();
	const tasks = db.query.tasks.findMany();

	return { containers, tasks };
}) satisfies LayoutServerLoad;

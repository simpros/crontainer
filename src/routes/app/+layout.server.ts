import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { db } }) => {
	const containers = Promise.resolve([]);
	const tasks = db.query.tasks.findMany();

	return { containers, tasks };
}) satisfies LayoutServerLoad;

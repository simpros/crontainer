import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params: { taskid } }) => {
	const { crontainer } = await parent();

	const task = await crontainer.task.get(taskid);

	if (task.error) {
		return error(task.error.code, task.error.message);
	}
	if (!task.data) {
		return error(404, 'Task not found');
	}
	return { task };
}) satisfies LayoutLoad;

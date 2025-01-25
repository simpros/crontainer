import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params: { taskid } }) => {
	const { crontainer } = await parent();
	const task = await crontainer.task.get(taskid);

	if (task.error) {
		return error(task.error.code, task.error.message);
	}
	if (!task.data) {
		return error(404, 'Task not found');
	}

	console.log('task.data', task.data);

	const form = await superValidate(task.data, valibot(taskSchema));

	return { form };
}) satisfies PageLoad;

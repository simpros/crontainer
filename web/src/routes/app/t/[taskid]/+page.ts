import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { task } = await parent();

	const form = await superValidate(task.data, valibot(taskSchema));

	return { form, task };
}) satisfies PageLoad;

import { taskSchema } from '$db/tasks';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	try {
		const { task } = await parent();
		const form = await superValidate(task, valibot(taskSchema));
		return { form };
	} catch {
		return error(500, 'Database error');
	}
}) satisfies PageServerLoad;

import { taskSchema } from '$db/tasks';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { db }, params: { taskid } }) => {
	try {
		const task = await db.query.tasks.findFirst({
			where({ id }, { eq }) {
				return eq(id, parseInt(taskid));
			}
		});
		if (!task) {
			return error(404, 'Task not found');
		}
		const form = await superValidate(task, valibot(taskSchema));
		return { form };
	} catch {
		return error(500, 'Database error');
	}
}) satisfies PageServerLoad;

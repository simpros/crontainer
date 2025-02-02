import { tasks } from '$db';
import { isRedirect, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const form = await superValidate(valibot(taskSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { db } }) => {
		const form = await superValidate(request, valibot(taskSchema));
		if (!form.valid) {
			return { form };
		}

		try {
			const result = await db.insert(tasks).values(form.data).returning({ insertedId: tasks.id });
			redirect(303, `/app/t/${result[0]?.insertedId}`);
		} catch (error) {
			if (isRedirect(error)) throw error;
			if (error instanceof Error) return setError(form, error.message);
			else return setError(form, 'Database error');
		}
	}
};

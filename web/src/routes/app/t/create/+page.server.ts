import { redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';

export const actions = {
	default: async ({ request, locals: { crontainer } }) => {
		const form = await superValidate(request, valibot(taskSchema));
		if (!form.valid) {
			return { form };
		}

		const { data, error } = await crontainer.task.create(form.data);
		if (error) {
			return setError(form, error.message);
		}
		redirect(303, `/app/t/${data.id}`);
	}
};

import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(taskSchema));

		return { form };
	}
};

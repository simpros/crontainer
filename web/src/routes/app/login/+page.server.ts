import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { loginSchema } from './login-schema';

export const load = (async () => {
	return {
		form: await superValidate(valibot(loginSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(loginSchema));
		if (!form.valid)
			return fail(400, {
				form
			});

		return {
			form
		};
	}
};

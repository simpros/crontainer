import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { taskSchema } from '../task-schema';
import type { PageLoad } from './$types';

export const load = (async () => {
	const form = await superValidate(valibot(taskSchema));
	return { form };
}) satisfies PageLoad;

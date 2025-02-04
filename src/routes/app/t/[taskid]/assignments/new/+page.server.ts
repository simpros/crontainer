import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { assignmentSchema } from '../assignment-schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const form = await superValidate({ schedule: '* * * * *' }, valibot(assignmentSchema));
	return { form };
}) satisfies PageServerLoad;

import { assignmentContainers } from '$db/assignmentContainers';
import { taskAssignments } from '$db/taskAssignments';
import { isRedirect, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { assignmentSchema } from '../assignment-schema';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const form = await superValidate({ schedule: '* * * * *' }, valibot(assignmentSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { db }, params: { taskid } }) => {
		const form = await superValidate(request, valibot(assignmentSchema));
		if (!form.valid) {
			return form;
		}

		try {
			await db.transaction(async (tx) => {
				const [{ assignmentId: taskAssignmentId }] = await tx
					.insert(taskAssignments)
					.values({
						schedule: form.data.schedule,
						taskId: parseInt(taskid),
						active: true
					})
					.returning({ assignmentId: taskAssignments.id });

				await tx.insert(assignmentContainers).values(
					form.data.containerIds.map((containerId) => ({
						taskAssignmentId,
						containerId
					}))
				);
			});
		} catch (error) {
			if (isRedirect(error)) throw error;
			return message(form, { error });
		}

		redirect(303, `/app/t/${taskid}`);
	}
};

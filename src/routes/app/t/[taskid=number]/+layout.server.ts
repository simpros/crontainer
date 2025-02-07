import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { db }, params: { taskid } }) => {
	const task = await db.query.tasks.findFirst({
		where({ id }, { eq }) {
			return eq(id, parseInt(taskid));
		},
		with: {
			taskAssignments: {
				with: {
					assignmentContainers: true
				}
			}
		}
	});
	if (!task) {
		return error(404, 'Task not found');
	}
	return { task };
}) satisfies LayoutServerLoad;

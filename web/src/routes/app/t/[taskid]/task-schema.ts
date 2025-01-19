import * as v from 'valibot';

export const taskSchema = v.object({
	id: v.string(),
	name: v.string(),
	command: v.string(),
	createdAt: v.optional(v.date()),
	updatedAt: v.optional(v.date())
});

export type TaskSchema = typeof taskSchema;

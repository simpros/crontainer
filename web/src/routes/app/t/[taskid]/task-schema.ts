import * as v from 'valibot';

export const taskSchema = v.object({
	id: v.string(),
	name: v.pipe(v.string(), v.minLength(1)),
	command: v.pipe(v.string(), v.minLength(1)),
	createdAt: v.optional(v.date()),
	updatedAt: v.optional(v.date())
});

export type TaskSchema = typeof taskSchema;

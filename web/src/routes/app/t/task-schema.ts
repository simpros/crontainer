import * as v from 'valibot';

export const taskSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1)),
	command: v.pipe(v.string(), v.minLength(1))
});

export type TaskSchema = typeof taskSchema;

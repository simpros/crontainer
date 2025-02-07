import parser from 'cron-parser';
import * as v from 'valibot';

export const assignmentSchema = v.object({
	containerIds: v.array(v.pipe(v.string(), v.minLength(1))),
	schedule: v.pipe(
		v.string(),
		v.custom<string>((v) => {
			if (typeof v !== 'string') return false;
			try {
				parser.parseExpression(v);
				return true;
			} catch {
				return false;
			}
		}, 'Invalid cron string')
	),
	active: v.boolean()
});

export type AssignmentSchema = typeof assignmentSchema;

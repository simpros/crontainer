import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { assignmentContainers } from './assignmentContainers';
import { tasks } from './tasks';

export const taskAssignments = sqliteTable('task_assignments', {
	id: integer().primaryKey({ autoIncrement: true }),
	taskId: integer()
		.references(() => tasks.id, { onDelete: 'cascade' })
		.notNull(),
	schedule: text().notNull(),
	active: integer({ mode: 'boolean' }).default(true),
	createdAt: text().default(sql`(unixepoch())`),
	updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const taskAssignmentRelations = relations(taskAssignments, ({ one, many }) => ({
	task: one(tasks, {
		fields: [taskAssignments.taskId],
		references: [tasks.id]
	}),
	assignmentContainers: many(assignmentContainers)
}));

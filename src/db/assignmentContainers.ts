import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { taskAssignments } from './taskAssignments';

export const assignmentContainers = sqliteTable('assignment_containers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	taskAssignmentId: integer('task_assignment_id')
		.references(() => taskAssignments.id, { onDelete: 'cascade' })
		.notNull(),
	containerId: text('container_id').notNull(),
	createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const assignmentContainerRelations = relations(assignmentContainers, ({ one }) => ({
	taskAssignment: one(taskAssignments, {
		fields: [assignmentContainers.taskAssignmentId],
		references: [taskAssignments.id]
	})
}));

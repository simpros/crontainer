import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	command: text().notNull(),
	createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
});

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

export const assignmentContainers = sqliteTable('assignment_containers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	taskAssignmentId: integer('task_assignment_id')
		.references(() => taskAssignments.id, { onDelete: 'cascade' })
		.notNull(),
	containerId: text('container_id').notNull(),
	createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const taskRelations = relations(tasks, ({ many }) => ({
	taskAssignments: many(taskAssignments)
}));

export const taskAssignmentRelations = relations(taskAssignments, ({ one, many }) => ({
	task: one(tasks, {
		fields: [taskAssignments.taskId],
		references: [tasks.id]
	}),
	assignmentContainers: many(assignmentContainers)
}));

export const assignmentContainerRelations = relations(assignmentContainers, ({ one }) => ({
	taskAssignment: one(taskAssignments, {
		fields: [assignmentContainers.taskAssignmentId],
		references: [taskAssignments.id]
	})
}));

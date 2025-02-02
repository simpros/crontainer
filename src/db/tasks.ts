import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { taskAssignments } from './taskAssignments';

export const tasks = sqliteTable('tasks', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	command: text().notNull(),
	createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
	updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const taskRelations = relations(tasks, ({ many }) => ({
	taskAssignments: many(taskAssignments)
}));

export type Tasks = typeof tasks.$inferSelect;
export type TasksCreate = typeof tasks.$inferInsert;

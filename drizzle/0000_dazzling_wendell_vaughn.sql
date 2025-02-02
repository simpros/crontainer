CREATE TABLE `assignment_containers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_assignment_id` integer NOT NULL,
	`container_id` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`task_assignment_id`) REFERENCES `task_assignments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task_assignments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`taskId` integer NOT NULL,
	`schedule` text NOT NULL,
	`active` integer DEFAULT true,
	`createdAt` text DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`command` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch())
);

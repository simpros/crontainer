// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { LibSQLDatabase } from 'drizzle-orm/libsql';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: LibSQLDatabase<typeof import('./schema')>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

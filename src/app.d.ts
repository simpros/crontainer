// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type Dockerode from 'dockerode';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: LibSQLDatabase<typeof import('./db/_schema')>;
			dockerode: Dockerode;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

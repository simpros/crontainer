// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { CrontainerClient } from '$lib/crontainer/crontainer-client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			crontainer: CrontainerClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

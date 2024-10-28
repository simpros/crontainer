// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {BackbackerClient} from "$lib/backbacker/backbacker-client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			backbacker: BackbackerClient
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

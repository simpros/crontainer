import { Dockermanagement } from '$lib/backbacker/services/dockermanagement';
import type { BaseServiceArgs } from '$lib/backbacker/services/base-service';

export class BackbackerClient {
	dockermanagement: Dockermanagement;

	constructor(args: BaseServiceArgs) {
		this.dockermanagement = new Dockermanagement(args);
	}
}

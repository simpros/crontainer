import { BaseService, type BaseServiceArgs } from '$lib/backbacker/services/base-service';
import { parseResponse } from '$lib/backbacker/utils/response-parser';
import type { DockerContainerDto } from '../types';

export class Dockermanagement extends BaseService {
	constructor(args: BaseServiceArgs) {
		super(args);
	}

	async getContainers() {
		return parseResponse<DockerContainerDto[]>(await this.fetch(`${this.baseUrl}/containers`));
	}
}

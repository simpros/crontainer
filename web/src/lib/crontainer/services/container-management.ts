import { BaseService, type BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { parseResponse } from '$lib/crontainer/utils/response-parser';
import type { DockerContainerDto } from '../types';

export class ContainerManagement extends BaseService {
	constructor(args: BaseServiceArgs) {
		super(args);
	}

	async getContainers() {
		return parseResponse<DockerContainerDto[]>(await this.fetch(`${this.baseUrl}/containers`));
	}
}

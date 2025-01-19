import { BaseService, type BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { parseResponse } from '$lib/crontainer/utils/response-parser';
import type { TaskDto } from '../types';

export class TaskService extends BaseService {
	constructor(args: BaseServiceArgs) {
		super(args);
	}

	async getAll() {
		return parseResponse<TaskDto[]>(await this.fetch(`${this.baseUrl}/task`));
	}

	async get(taskId: string) {
		return parseResponse<TaskDto>(await this.fetch(`${this.baseUrl}/task/${taskId}`));
	}
}

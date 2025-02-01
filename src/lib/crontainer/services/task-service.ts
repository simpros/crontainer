import { BaseService, type BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { parseResponse } from '$lib/crontainer/utils/response-parser';
import type { CreateTask, TaskDto as Task } from '../types';

export class TaskService extends BaseService {
	constructor(args: BaseServiceArgs) {
		super(args);
	}

	async getAll() {
		return parseResponse<Task[]>(await this.fetch(`${this.baseUrl}/task/`));
	}

	async get(taskId: string) {
		return parseResponse<Task>(await this.fetch(`${this.baseUrl}/task/${taskId}`));
	}

	async create(task: CreateTask) {
		return parseResponse<Task>(
			await this.fetch(`${this.baseUrl}/task/`, {
				method: 'POST',
				body: JSON.stringify(task)
			})
		);
	}
}

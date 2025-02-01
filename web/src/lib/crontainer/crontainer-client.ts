import type { BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { ContainerService } from '$lib/crontainer/services/container-service';
import { TaskService } from './services/task-service';

export class CrontainerClient {
	container: ContainerService;
	task: TaskService;
	private args: BaseServiceArgs;

	constructor(args: BaseServiceArgs) {
		this.args = args;
		this.container = new ContainerService(args);
		this.task = new TaskService(args);
	}

	async isAvailable() {
		try {
			const res = await fetch(`${this.args.baseUrl}/health`);
			return res.ok;
		} catch {
			return false;
		}
	}
}

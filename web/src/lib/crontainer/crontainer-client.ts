import type { BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { ContainerService } from '$lib/crontainer/services/container-service';
import { TaskService } from './services/task-service';

export class CrontainerClient {
	container: ContainerService;
	task: TaskService;

	constructor(args: BaseServiceArgs) {
		this.container = new ContainerService(args);
		this.task = new TaskService(args);
	}
}

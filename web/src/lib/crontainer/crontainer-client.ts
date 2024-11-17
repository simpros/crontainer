import type { BaseServiceArgs } from '$lib/crontainer/services/base-service';
import { ContainerManagement } from '$lib/crontainer/services/container-management';
import { CronManagement } from './services/cron-management';

export class CrontainerClient {
	container: ContainerManagement;
	cron: CronManagement;

	constructor(args: BaseServiceArgs) {
		this.container = new ContainerManagement(args);
		this.cron = new CronManagement(args);
	}
}

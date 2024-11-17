import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { crontainer } = await parent();
	return { jobs: await crontainer.cron.getJobs() };
}) satisfies PageLoad;

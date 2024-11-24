import type { LayoutLoad } from './$types';

export const load = (async ({ parent, depends }) => {
	const { crontainer } = await parent();
	depends('crontainer:containers');
	const containers = await crontainer.container.getContainers();
	console.log(containers);

	return {
		containers
	};
}) satisfies LayoutLoad;

import type { LayoutLoad } from './$types';

export const load = (async ({ parent, depends }) => {
	const { crontainer } = await parent();
	depends('crontainer:containers');
	return {
		containers: await crontainer.container.getContainers()
	};
}) satisfies LayoutLoad;
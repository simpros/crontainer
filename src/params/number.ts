import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): boolean => {
	return !Number.isNaN(+param);
}) satisfies ParamMatcher;

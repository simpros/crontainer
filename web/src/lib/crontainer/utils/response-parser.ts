import type { CrontainerResponse } from '$lib/crontainer/types';

export async function parseResponse<ExpectedData>(
	res: Response
): Promise<CrontainerResponse<ExpectedData>> {
	if (res.ok) {
		return {
			data: (await res.json().then(defaultConverter)) as ExpectedData,
			error: null
		};
	}
	return {
		data: null,
		error: await res.json()
	};
}

async function defaultConverter<T extends object>(res: T) {
	if ('createdAt' in res) {
		res.createdAt = new Date(res.createdAt as string);
	}
	if ('updatedAt' in res) {
		res.updatedAt = new Date(res.updatedAt as string);
	}
	return res;
}

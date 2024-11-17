import type { CrontainerResponse } from '$lib/crontainer/types';

export async function parseResponse<ExpectedData>(
	res: Response
): Promise<CrontainerResponse<ExpectedData>> {
	if (res.ok) {
		return {
			data: (await res.json()) as ExpectedData,
			error: null
		};
	}
	return {
		data: null,
		error: await res.json()
	};
}

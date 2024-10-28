import type { BackbackerResponse } from '$lib/backbacker/types';

export async function parseResponse<ExpectedData>(
	res: Response
): Promise<BackbackerResponse<ExpectedData>> {
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

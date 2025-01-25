import type { CrontainerResponse, ErrorDto } from '$lib/crontainer/types';

export async function parseResponse<ExpectedData>(
	res: Response
): Promise<CrontainerResponse<ExpectedData>> {
	if (res.ok) {
		const { data } = (await res.json().then(defaultConverter)) as { data: ExpectedData };
		return {
			data,
			error: null
		};
	}
	return {
		data: null,
		error: (await res.json()) as ErrorDto
	};
}

async function defaultConverter<T extends object>(res: T) {
	console.log('res', res);

	if ('createdAt' in res) {
		res.createdAt = new Date(res.createdAt as string);
	}
	if ('updatedAt' in res) {
		res.updatedAt = new Date(res.updatedAt as string);
	}
	return res;
}

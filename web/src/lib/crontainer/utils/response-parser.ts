import type { CrontainerResponse, ErrorDto, SuccessDto } from '$lib/crontainer/types';

export async function parseResponse<ExpectedData>(
	res: Response
): Promise<CrontainerResponse<ExpectedData>> {
	if (res.ok) {
		const data = (await res.json().then(defaultConverter)) as ExpectedData;

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

async function defaultConverter(res: SuccessDto) {
	if (Array.isArray(res.data)) {
		return res.data.map((item) => parseObject(item));
	}
	if (typeof res.data === 'object') {
		return parseObject(res.data as object);
	}
}

const possibleDateKeys = ['createdAt', 'updatedAt'];

function parseObject<T extends object>(obj: T) {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			if (possibleDateKeys.includes(key) && typeof value === 'string') {
				acc[key] = new Date(value);
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, string | number | Date>
	);
}

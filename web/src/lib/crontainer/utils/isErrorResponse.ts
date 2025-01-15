import type { CrontainerErrorResponse, CrontainerResponse } from '../types';

export function isErrorResponse<T>(
	response: CrontainerResponse<T>
): response is CrontainerErrorResponse {
	return response.error !== null;
}

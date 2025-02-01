type Fetch = typeof fetch;
export type BaseServiceArgs = {
	fetch: Fetch;
	baseUrl: string;
};

export abstract class BaseService {
	protected baseUrl: string;
	protected fetch: Fetch;

	protected constructor({ fetch, baseUrl }: BaseServiceArgs) {
		this.baseUrl = baseUrl;
		this.fetch = fetch;
	}
}

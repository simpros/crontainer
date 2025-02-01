export type ErrorDto = {
	code: number;
	message: string;
};

export type SuccessDto<T = unknown> = {
	data: T;
};

export type DockerContainerDto = {
	Id: string;
	Names: string[];
	Image: string;
	ImageID: string;
	Command: string;
	Created: number;
	Ports: unknown;
	Labels: Record<string, unknown>;
	State: string;
	Status: string;
	HostConfig: {
		NetworkMode: string;
	};
	NetworkSettings: {
		Networks: {
			[key: string]: {
				IPAMConfig: unknown;
				Links: unknown;
				Aliases: unknown;
				MacAddress: string;
				DriverOpts: unknown;
				NetworkID: string;
				EndpointID: string;
				Gateway: string;
				IPAddress: string;
				IPPrefixLen: number;
				IPv6Gateway: string;
				GlobalIPv6Address: string;
				GlobalIPv6PrefixLen: number;
				DNSNames: unknown;
			};
		};
	};
	Mounts: unknown[];
};

export type TaskDto = {
	id: string;
	name: string;
	command: string;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateTask = {
	name: string;
	command: string;
};

export type CrontainerErrorResponse = {
	data: null;
	error: {
		code: number;
		message: string;
	};
};
export type CrontainerSuccessResponse<T> = {
	error: null;
	data: T;
};
export type CrontainerResponse<T> = CrontainerSuccessResponse<T> | CrontainerErrorResponse;

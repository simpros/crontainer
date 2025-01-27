<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import type { CrontainerResponse, DockerContainerDto, TaskDto } from '$lib/crontainer/types';
	import { isErrorResponse } from '$lib/crontainer/utils/is-error-response';
	import ContainerList from './container-list.svelte';
	import TaskList from './task-list.svelte';

	type Props = {
		containers: Promise<CrontainerResponse<DockerContainerDto[]>>;
		tasks: Promise<CrontainerResponse<TaskDto[]>>;
	};

	const { containers, tasks }: Props = $props();
</script>

<aside>
	<header class="m-2 grid grid-cols-[auto_1fr] gap-4 rounded-xl px-3 py-2">
		<h2 class="w-min text-4xl font-bold">Crontainer</h2>
	</header>
	<section class="ml-5">
		<Accordion.Root type="single">
			<Accordion.Item value="tasks">
				<Accordion.Trigger>Tasks</Accordion.Trigger>
				<Accordion.Content>
					{#await tasks then $tasks}
						{#if !isErrorResponse($tasks)}
							<TaskList tasks={$tasks.data} />
						{:else}
							<p>{$tasks.error.message}</p>
						{/if}
					{/await}
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="containers">
				<Accordion.Trigger>Container</Accordion.Trigger>
				<Accordion.Content>
					{#await containers then $containers}
						{#if !isErrorResponse($containers)}
							<ContainerList containers={$containers.data} />
						{:else}
							<p>{$containers.error.message}</p>
						{/if}
					{/await}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</section>
</aside>

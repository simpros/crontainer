<script lang="ts">
	import type { Tasks } from '$db/tasks';
	import * as Accordion from '$lib/components/ui/accordion';
	import type { ContainerInfo } from 'dockerode';
	import ContainerList from './container-list.svelte';
	import TaskList from './task-list.svelte';

	type Props = {
		containers: Promise<ContainerInfo[]>;
		tasks: Promise<Tasks[]>;
	};

	const { containers, tasks }: Props = $props();
</script>

<aside class="rounded-r-3xl bg-sidebar pr-6">
	<header class="m-2 grid grid-cols-[auto_1fr] gap-4 rounded-xl px-3 py-2">
		<h2 class="w-min text-4xl font-bold">Crontainer</h2>
	</header>
	<section class="ml-5">
		<Accordion.Root type="single">
			<Accordion.Item value="tasks">
				<Accordion.Trigger>Tasks</Accordion.Trigger>
				<Accordion.Content>
					{#await tasks then $tasks}
						<TaskList tasks={$tasks} />
					{:catch err}
						<p>{err.message}</p>
					{/await}
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="containers">
				<Accordion.Trigger>Container</Accordion.Trigger>
				<Accordion.Content>
					{#await containers then $containers}
						<ContainerList containers={$containers} />
					{:catch err}
						<p>{err.message}</p>
					{/await}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</section>
</aside>

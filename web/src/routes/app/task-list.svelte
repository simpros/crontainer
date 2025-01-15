<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import type { TaskDto } from '$lib/crontainer/types';
	import { cn } from '$lib/utils';

	type Props = {
		tasks: TaskDto[];
	};
	let { tasks }: Props = $props();
</script>

<section class="space-y-1">
	{#each tasks as task}
		{@const active = $page.params.taskid == task.id}
		<Button
			variant="ghost"
			class={cn(active && 'bg-muted', 'w-full justify-start')}
			href="/app/t/{task.id}"
		>
			<div class="font-bold">{task.name}</div>
		</Button>
	{/each}
</section>

<script lang="ts">
	import { page } from '$app/state';
	import type { Tasks } from '$db/tasks';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type Props = {
		tasks: Tasks[];
	};
	let { tasks }: Props = $props();
</script>

<section class="space-y-1">
	{#each tasks as task}
		{@const active = parseInt(page.params.taskid) == task.id}
		<Button
			variant="ghost"
			class={cn(active && 'bg-muted', 'w-full justify-start')}
			href="/app/t/{task.id}"
		>
			<div class="font-bold">{task.name}</div>
		</Button>
	{/each}
	<Button
		variant="default"
		class={cn(
			page.route.id === '/app/t/create' && 'bg-muted text-foreground hover:text-primary-foreground',
			'w-full justify-start transition-all'
		)}
		href="/app/t/create"
	>
		<div class="font-bold">Add</div>
	</Button>
</section>

<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { ContainerInfo } from 'dockerode';

	type Props = {
		containers: ContainerInfo[];
	};
	let { containers }: Props = $props();
</script>

<section class="flex flex-col gap-1">
	{#each containers as container}
		{@const active = page.params.containerid === container.Id}
		<Button
			variant="ghost"
			class={cn(active && 'bg-muted', 'justify-start')}
			href="/c/{container.Id}"
		>
			<div class="font-bold">{container.Names[0].replace('/', '')}</div>
		</Button>
	{/each}
</section>

<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import type { DockerContainerDto } from '$lib/crontainer/types';
	import { cn } from '$lib/utils';

	type Props = {
		containers: DockerContainerDto[];
	};
	let { containers }: Props = $props();
</script>

<section class="flex flex-col gap-1">
	{#each containers as container}
		{@const active = $page.params.containerid === container.Id}
		<Button
			variant="ghost"
			class={cn(active && 'bg-muted', 'justify-start')}
			href="/c/{container.Id}"
		>
			<div class="font-bold">{container.Names[0].replace('/', '')}</div>
		</Button>
	{/each}
</section>

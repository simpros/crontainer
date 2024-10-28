<script lang="ts">
	import { page } from '$app/stores';
	import type { DockerContainerDto } from '$lib/backbacker/types';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { cn } from '$lib/utils';
	import { derived } from 'svelte/store';

	type Props = {
		containers: DockerContainerDto[];
	};
	let { containers }: Props = $props();
	const active = derived(page, ($page) => $page.params.containerid);
</script>

<ScrollArea>
	{#each containers as container}
		<a
			href={`/c/${container.Id}`}
			class={cn(
				'hover:bg-muted flex items-center justify-between rounded-lg border p-3 transition-colors',
				{
					'!bg-muted': $active === container.Id
				}
			)}
		>
			<div class="font-bold">{container.Names[0].replace('/', '')}</div>
			<div
				class={cn('bg-destructive size-4 rounded-full', {
					'bg-success': container.State === 'running'
				})}
			></div>
		</a>
	{/each}
</ScrollArea>

<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import ContainerList from './container-list.svelte';

	let { data, children } = $props();
	let fetching = $state(false);

	onMount(() => {
		const interval = setInterval(async () => {
			fetching = true;
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await invalidate('crontainer:containers');
			fetching = false;
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<ModeWatcher />

{#if data.containers.error}
	<p style="color: red">{data.containers.error?.code}</p>
{:else}
	<section class="grid h-full grid-cols-[min-content_3fr] gap-3">
		<ContainerList containers={data.containers.data} />
		<div>
			{@render children()}
		</div>
	</section>
{/if}

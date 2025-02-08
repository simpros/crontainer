<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Sidebar from './sidebar.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<section class="grid h-full grid-cols-[20rem_1fr] gap-5">
	<Sidebar containers={data.containers} tasks={data.tasks} />
	<main class="h-full p-4">
		{@render children()}
	</main>
</section>

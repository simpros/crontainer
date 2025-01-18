<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Sidebar from './sidebar.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<section class="grid h-full grid-cols-[minmax(min-content,20%)_1fr] gap-5">
	<Sidebar containers={data.containers} tasks={data.tasks} />
	<main class="bg-muted h-full rounded-l-3xl p-4">
		{@render children()}
	</main>
</section>

<script lang="ts">
	import AssignmentForm from '../assignment-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="grid h-full grid-rows-[auto,1fr] gap-4">
	<h1 class="text-muted-foreground">
		New Assignment to <span class="font-mono text-foreground">{data.task.name}</span>
	</h1>

	<AssignmentForm {data} />
</section>

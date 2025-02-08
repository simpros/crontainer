<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="rounded-lg border bg-card px-3 py-1 text-card-foreground shadow-sm">
	{@render children()}
</div>

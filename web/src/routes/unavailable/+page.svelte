<script lang="ts">
	import { goto } from '$app/navigation';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { onMount } from 'svelte';

	let progress = $state<number | null>(0);

	onMount(() => {
		const interval = setInterval(() => {
			if (progress === null) return;
			progress += 1;
			if (progress >= 100) {
				progress = null;
				goto('/');
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<main class="grid size-full place-content-center gap-3">
	<h1>Unavailable</h1>
	<p>Sorry, the server could not be reached</p>
	<Progress value={progress} max={100} />
</main>

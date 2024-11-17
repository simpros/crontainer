<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<section class="grid h-full grid-rows-[auto_1fr]">
	<Header />
	<main class="px-2 pb-3">
		{@render children()}
	</main>
</section>

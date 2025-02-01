<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { Button } from './ui/button';

	type Props = {
		items: { label: string; href: string }[];
	};
	let { items }: Props = $props();
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class="flex space-x-4">
	{#each items as item}
		{@const isActive = $page.url.pathname.startsWith(item.href)}

		<Button
			href={item.href}
			variant="ghost"
			class={cn(!isActive && 'hover:underline', 'relative justify-start hover:bg-transparent')}
			data-sveltekit-noscroll
		>
			{#if isActive}
				<div
					class="bg-muted absolute inset-0 rounded-md"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				></div>
			{/if}
			<div class="relative">
				{item.label}
			</div>
		</Button>
	{/each}
</nav>

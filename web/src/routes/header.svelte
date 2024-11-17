<script lang="ts">
	import NavTabs from '$lib/components/nav-tabs.svelte';
</script>

<header
	class="m-2 grid grid-cols-[auto_1fr] gap-4 rounded-xl bg-neutral-500/10 px-3 py-2 backdrop-blur-md"
>
	<h2 class="w-min text-4xl font-bold">Crontainer</h2>
	<NavTabs
		items={[
			{ label: 'Container', href: '/c' },
			{ label: 'Jobs', href: '/jobs' }
		]}
	/>
</header>

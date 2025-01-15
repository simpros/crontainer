<script lang="ts">
	import type { PageData } from '../$types';
	import TaskList from '../../task-list.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#if data.tasks.error}
	<p style="color: red">{data.tasks.error?.code}</p>
{:else}
	<section class="grid h-full grid-cols-[min-content_3fr] gap-3">
		<TaskList tasks={data.tasks.data} />
		<div>
			<!-- {@render children()} -->
		</div>
	</section>
{/if}

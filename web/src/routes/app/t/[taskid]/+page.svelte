<script lang="ts">
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.tasks.error}
	<p style="color: red">{data.tasks.error?.code}</p>
{:else}
	<section class="grid h-full grid-cols-[min-content_3fr] gap-3">
		<div>Hi</div>
	</section>
{/if}

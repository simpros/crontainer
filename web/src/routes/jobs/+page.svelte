<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.jobs.error}
	<p style="color: red">{data.jobs.error?.code}</p>
{:else}
	<section class="grid h-full grid-cols-[min-content_3fr] gap-3">
		<!-- <JobList jobs={data.jobs.data} /> -->
		<div>
			<!-- {@render children()} -->
		</div>
	</section>
{/if}

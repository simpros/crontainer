<script lang="ts">
	import TaskForm from '../task-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="space-y-8">
	<h1>New Task</h1>
	<TaskForm {data} />
</section>

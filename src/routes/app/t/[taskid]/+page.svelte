<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import TaskForm from '../task-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1 class="text-3xl font-bold">Task</h1>
	<div class="ml-3 mt-3">
		<TaskForm {data} />
	</div>
	<h2 class="text-2xl font-bold">Assignments</h2>
	<div class="ml-3 mt-3">
		<Button href="/app/t/{page.params.taskid}/assignments/new" class="btn">New Assignment</Button>
	</div>
</div>

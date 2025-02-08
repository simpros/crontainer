<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import TaskForm from '../task-form.svelte';
	import type { PageData } from './$types';
	import AssignmentCard from './assignment-card.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1 class="text-3xl font-bold">Task</h1>
	<div class="my-3 ml-3">
		<TaskForm {data} />
	</div>
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Assignments</h2>
		<Button size="sm" href="/app/t/{page.params.taskid}/assignments/new" class="btn"
			>New Assignment</Button
		>
	</div>
	<div class="ml-3 mt-3">
		<div class="grid gap-x-3 gap-y-2 grid-auto-fill-md">
			{#each data.task.taskAssignments as assignment}
				<AssignmentCard>
					<div>{assignment.schedule}</div>
					<span class="text-muted-foreground"
						>{assignment.assignmentContainers.length} Container{assignment.assignmentContainers
							.length !== 1
							? 's'
							: ''} assigned</span
					>
				</AssignmentCard>
			{/each}
		</div>
	</div>
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import TaskForm from './task-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<TaskForm {data} />

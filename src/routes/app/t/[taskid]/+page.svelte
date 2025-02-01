<script lang="ts">
	import TaskForm from '../task-form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<TaskForm {data} />

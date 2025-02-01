<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { StreamLanguage } from '@codemirror/language';
	import { shell } from '@codemirror/legacy-modes/mode/shell';
	import { EditorView } from '@codemirror/view';
	import CodeMirror from 'svelte-codemirror-editor';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { taskSchema, type TaskSchema } from './task-schema';

	let { data }: { data: { form: SuperValidated<Infer<TaskSchema>> } } = $props();
	let myTheme = EditorView.theme(
		{
			'&': {
				backgroundColor: 'hsl(var(--background) / var(--tw-bg-opacity, 1))',
				color: 'inherit'
			},
			'.cm-gutters': {
				backgroundColor: 'hsl(var(--muted) / var(--tw-bg-opacity, 1))',
				color: 'hsl(var(--foreground) / 0.8)',
				borderWidth: '0',
				borderRadius: '6px'
			}
		},
		{ dark: true }
	);

	const form = superForm(data.form, {
		dataType: 'json',
		validators: valibotClient(taskSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="grid h-full grid-rows-[1fr_auto] gap-4">
	<div>
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="command">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Command</Form.Label>
					<CodeMirror
						{...props}
						class="[&>.cm-editor]:rounded-md [&>.cm-editor]:border [&>.cm-editor]:border-black"
						theme={myTheme}
						bind:value={$formData.command}
						extensions={[StreamLanguage.define(shell)]}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<div class="flex justify-end">
		<Form.Button>Submit</Form.Button>
	</div>
</form>

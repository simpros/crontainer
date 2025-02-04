<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import parser from 'cron-parser';
	import { format } from 'date-fns';
	import type { ContainerInfo } from 'dockerode';
	import { derived } from 'svelte/store';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { assignmentSchema, type AssignmentSchema } from './assignment-schema';

	type AssignmentFormProps = {
		data: {
			form: SuperValidated<Infer<AssignmentSchema>>;
			containers: Promise<ContainerInfo[]>;
		};
	};
	let { data }: AssignmentFormProps = $props();

	const form = superForm(data.form, {
		validators: valibotClient(assignmentSchema)
	});

	const { form: formData, enhance } = form;

	function addContainerId(id: string) {
		$formData.containerIds = [...$formData.containerIds, id];
	}

	function removeContainerId(id: string) {
		$formData.containerIds = $formData.containerIds.filter((containerId) => containerId !== id);
	}

	const nextFiveExecutionTimes = derived(formData, ($formData) => {
		try {
			const cron = parser.parseExpression($formData.schedule, {
				currentDate: new Date()
			});
			return Array.from({ length: 5 }, () => format(cron.next().toDate(), 'PPpp'));
		} catch (error) {
			return [];
		}
	});
</script>

{#snippet FormElement(containers: ContainerInfo[])}
	<form method="POST" use:enhance class="grid h-full grid-rows-[1fr_auto] gap-4">
		<div class="space-y-4">
			<Form.FormField {form} name="schedule">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Schedule</Form.Label>
						<Input {...props} bind:value={$formData.schedule} />
					{/snippet}
				</Form.Control>
				<Form.Description class="flex flex-wrap gap-1">
					{#each $nextFiveExecutionTimes as time}
						<Badge>{time}</Badge>
					{/each}
				</Form.Description>
				<Form.FieldErrors />
			</Form.FormField>

			<Form.FormFieldset {form} name="containerIds">
				<Form.Legend>Containers</Form.Legend>
				<div class="grid grid-cols-4">
					{#each containers as { Id, Names }}
						<Card.Root class="p-2">
							<Form.Control>
								{#snippet children({ props })}
									<Checkbox
										{...props}
										bind:checked={
											() => $formData.containerIds.includes(Id),
											(v) => (v ? addContainerId(Id) : removeContainerId(Id))
										}
									/>
									<Form.Label>{Names[0]}</Form.Label>
								{/snippet}
							</Form.Control>
						</Card.Root>
					{/each}
				</div>
			</Form.FormFieldset>
		</div>

		<div class="flex justify-center">
			<Form.Button>Save</Form.Button>
		</div>
	</form>
{/snippet}

{#await data.containers}
	<p>Loading...</p>
{:then containers}
	{@render FormElement(containers)}
{:catch error}
	<p>{error.message}</p>
{/await}

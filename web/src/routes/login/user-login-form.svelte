<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './login-schema';

	const { data }: { data: SuperValidated<Infer<LoginSchema>> } = $props();
	const form = superForm(data, {
		validators: valibotClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="post" class="w-full max-w-lg" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label for="email">Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label for="password">Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>

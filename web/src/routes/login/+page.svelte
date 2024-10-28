<script lang="ts">
	import type { PageData } from './$types';
	import UserLoginForm from './user-login-form.svelte';

	export let data: PageData;
</script>

<section class="grid h-full place-items-center">
	<UserLoginForm data={data.form} />
</section>

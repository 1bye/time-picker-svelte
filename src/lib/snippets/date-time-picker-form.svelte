<script lang="ts" module>
	import { z } from 'zod';

	export const formSchema = z.object({
		dob: z.string().refine((v) => v, { message: 'A date of birth is required.' })
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import {
		type DateValue,
		parseDateTime,
	} from '@internationalized/date';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import DateTimePicker from './date-time-picker.svelte';

	let data: SuperValidated<Infer<FormSchema>> = $page.data.datePicker;
	export { data as form };

	const form = superForm(data, {
		validators: zodClient(formSchema),
		taintedMessage: null,
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	let value = $state<DateValue | undefined>();

	$effect(() => {
		value = $formData.dob ? parseDateTime($formData.dob) : undefined;
	});
</script>

<form method="POST" action="/?/datePicker" class="space-y-8" use:enhance>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Date of birth</Form.Label>
				<DateTimePicker
					bind:date={value}
					setDate={(v) => {
						if (v) {
							$formData.dob = v.toString();
						} else {
							$formData.dob = '';
						}
					}}
				/>
				<Form.Description>Your date of birth is used to calculator your age</Form.Description>
				<Form.FieldErrors />
				<input hidden value={$formData.dob} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Button type="submit">Submit</Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>

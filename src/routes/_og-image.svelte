<script lang="ts">
    import TimePickerWrapper from '$lib/snippets/time-picker.svelte';
	import { Time } from '@internationalized/date';

	const _time = new Time(15, 16);

	let time = $state(_time);
</script>

<div
	class="m-24 flex flex-col gap-8 container max-w-3xl relative mx-auto flex-1 p-4 border border-border backdrop-blur-[2px] rounded-lg"
>
	<div class="flex flex-col items-center gap-4 text-center mx-auto max-w-2xl m-12">
		<h1 class="text-3xl font-cal">Time Picker</h1>
		<p class="text-muted-foreground text-lg max-w-lg">
			A <code class="font-light">{`<TimePickerInput />`}</code>{' '}
			component built with Svelte and Shadcn UI.
		</p>

        <TimePickerWrapper bind:time />
	</div>
</div>

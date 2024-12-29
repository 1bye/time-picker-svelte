<script lang="ts">
	import { Time } from '@internationalized/date';
	import TimePickerInput from './time-picker-input.svelte';
	import { cn } from './cn';

	type $$Props = {
		time: Time | undefined;

		view?: 'labels' | 'dotted';

		setTime?: (time: Time) => void;
	};

	export let time: $$Props['time'] = new Time(0, 0);
	export let view: $$Props['view'] = 'labels';
	export let setTime: $$Props['setTime'] = undefined;

	let minuteRef: HTMLInputElement | null = null;
	let hourRef: HTMLInputElement | null = null;
	let secondRef: HTMLInputElement | null = null;
</script>

<div class={cn('flex items-center gap-2', view === 'dotted' && 'gap-1')}>
	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<label for="hours" class="text-xs">Hours</label>
		{/if}

		<TimePickerInput
			picker="hours"
			bind:time
			bind:ref={hourRef}
			{setTime}
			onRightFocus={() => minuteRef?.focus()}
		/>
	</div>

	{#if view === 'dotted'}
		<span class="-translate-y-[2px]">:</span>
	{/if}

	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<label for="minutes" class="text-xs">Minutes</label>
		{/if}

		<TimePickerInput
			picker="minutes"
			bind:time
			bind:ref={minuteRef}
			{setTime}
			onLeftFocus={() => hourRef?.focus()}
			onRightFocus={() => secondRef?.focus()}
		/>
	</div>

	{#if view === 'dotted'}
		<span class="-translate-y-[2px]">:</span>
	{/if}

	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<label for="seconds" class="text-xs">Seconds</label>
		{/if}

		<TimePickerInput
			picker="seconds"
			bind:time
			bind:ref={secondRef}
			{setTime}
			onLeftFocus={() => minuteRef?.focus()}
		/>
	</div>
</div>

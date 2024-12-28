<script lang="ts">
	import { Time } from '@internationalized/date';
	import { Label } from '$lib/components/ui/label';
	import TimePickerInput from './time-picker-input.svelte';
	import { cn } from '$lib/utils';
	import TimePeriodSelect from './time-period-select.svelte';
	import type { Period } from './time-picker-utils';

	let {
		time = $bindable(new Time(0, 0)),
		period = $bindable('AM'),

		view = 'labels',

		setTime,
		setPeriod
	}: {
		time: Time | undefined;
		period?: Period;

		view?: 'labels' | 'dotted';

		setTime?: (time: Time) => void;
		setPeriod?: (period: Period) => void;
	} = $props();

	let minuteRef = $state<HTMLInputElement | null>(null);
	let hourRef = $state<HTMLInputElement | null>(null);
	let secondRef = $state<HTMLInputElement | null>(null);
	let periodRef = $state<HTMLInputElement | null>(null);
</script>

<div class={cn('flex items-center gap-2', view === 'dotted' && 'gap-1')}>
	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<Label for="hours" class="text-xs">Hours</Label>
		{/if}

		<TimePickerInput
			picker="12hours"
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
			<Label for="minutes" class="text-xs">Minutes</Label>
		{/if}

		<TimePickerInput
			picker="minutes"
			bind:time
			bind:ref={minuteRef}
			{setTime}
			{period}
			onLeftFocus={() => hourRef?.focus()}
			onRightFocus={() => secondRef?.focus()}
		/>
	</div>

	{#if view === 'dotted'}
		<span class="-translate-y-[2px]">:</span>
	{/if}

	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<Label for="seconds" class="text-xs">Seconds</Label>
		{/if}

		<TimePickerInput
			picker="seconds"
			bind:time
			bind:ref={secondRef}
			{setTime}
			onLeftFocus={() => minuteRef?.focus()}
			onRightFocus={() => periodRef?.focus()}
		/>
	</div>

	<div class="grid gap-1 text-center">
		{#if view === 'labels'}
			<Label for="period" class="text-xs">Period</Label>
		{/if}

		<TimePeriodSelect
			bind:period
			bind:time
			{setPeriod}
			{setTime}
			ref={periodRef}
			onLeftFocus={() => secondRef?.focus()}
		/>
	</div>
</div>

<script lang="ts" module>
	import type { Time as TimeType } from '@internationalized/date';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type TimePickerInputProps = WithElementRef<HTMLInputAttributes> & {
		type?: string;
		value?: string;
		name?: string;
		files?: FileList | undefined;
		picker: TimePickerType;
		time: TimeType | undefined;
		setTime?: (time: TimeType) => void;
		period?: Period;
		onRightFocus?: () => void;
		onLeftFocus?: () => void;
	};
</script>

<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import { Time } from '@internationalized/date';
	import {
		type Period,
		type TimePickerType,
		getArrowByType,
		getDateByType,
		setDateByType
	} from './time-picker-utils';

	let {
		class: className,
		type = 'tel',
		value,
		files = $bindable(),

		id,
		name,
		time = $bindable(new Time(0, 0)),
		setTime,
		picker,
		period,
		onLeftFocus,
		onRightFocus,

		onkeydown,
		onchange,

		ref = $bindable(null),

		...restProps
	}: TimePickerInputProps = $props();

	let flag = $state<boolean>(false);

	// derived display value, updates when `time` or `picker` change
	let calculatedValue = $derived.by(() => getDateByType(time, picker));

	$effect(() => {
		if (flag) {
			const timer = setTimeout(() => {
				flag = false;
			}, 2000);
			return () => clearTimeout(timer);
		}
	});

	function calculateNewValue(key: string) {
		const cur = calculatedValue.padStart(2, '0');
		const raw = flag ? cur[0] + key : key + cur[1];
		let num = Number.parseInt(raw, 10);

		num = picker === '12hours' ? Math.min(Math.max(num, 1), 12) : Math.min(Math.max(num, 0), 23);

		return String(num).padStart(2, '0');
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Tab') return;

		const isNavKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
		const isDigit = e.key >= '0' && e.key <= '9';

		if (isNavKey || isDigit) {
			e.preventDefault();
		}

		if (e.key === 'ArrowRight') onRightFocus?.();
		if (e.key === 'ArrowLeft') onLeftFocus?.();

		if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
			const step = e.key === 'ArrowUp' ? 1 : -1;
			const newValue = getArrowByType(calculatedValue, step, picker);

			if (flag) flag = false;

			const tempTime = time.copy();
			time = setDateByType(tempTime, newValue, picker, period);
			setTime?.(time);
		}

		if (isDigit) {
			const newVal = calculateNewValue(e.key);
			if (flag) onRightFocus?.();
			flag = !flag;

			const tempTime = time.copy();
			time = setDateByType(tempTime, newVal, picker, period);
			setTime?.(time);
		}
	}
</script>

<Input
	bind:ref
	id={id || picker}
	name={name || picker}
	class={cn(
		'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
		className
	)}
	value={value || calculatedValue}
	onchange={(e) => {
		e.preventDefault();
		onchange?.(e);
	}}
	{type}
	inputmode="decimal"
	onkeydown={(e) => {
		onkeydown?.(e);
		handleKeyDown(e);
	}}
	{...restProps} />

<script lang="ts">
	import type { Snippet as SnippetType } from '$lib/types';
	import { Snippet } from '$lib/components/ui/snippet';
	import * as Accordion from '$lib/components/ui/accordion';
	import { ModeToggle } from '$lib/components/theme/toggle-mode';
	import { Github } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import TimePicker12HourWrapper from '$lib/snippets/shadcn-svelte-runes/time-picker-12h.svelte';
	import TimePickerWrapper from '$lib/snippets/shadcn-svelte-runes/time-picker.svelte';
	import DateTimePicker from '$lib/snippets/shadcn-svelte-runes/date-time-picker.svelte';
	import { Time, getLocalTimeZone, now, CalendarDateTime } from '@internationalized/date';
	import * as Tabs from '$lib/components/ui/tabs';

	let {
		data
	}: {
		data: {
			snippets: SnippetType[];
		};
	} = $props();

	const snippets = $state(data.snippets.reduce((x, y) => {
		(x[y.folder] = (x[y.folder] || [])).push(y);

		return x;
	}, {}));
	const snippetKeys = Object.keys(snippets);

	const _date = now(getLocalTimeZone());
	const _time = new Time(_date.hour, _date.minute, _date.second, _date.millisecond);

	let date = $state(
		new CalendarDateTime(
			_date.year,
			_date.month,
			_date.day,
			_date.hour,
			_date.minute,
			_date.second,
			_date.millisecond
		)
	);

	let currentKey = $state(snippetKeys[1]);
	let time = $state(_time);
	let time2 = $state(_time);
</script>

<main class="relative flex min-h-screen flex-col items-center justify-between p-4 sm:p-16">
	<div class="top-0 mx-auto flex w-full max-w-3xl sm:sticky">
		<div
			class="flex flex-1 items-center justify-center gap-2 p-1 sm:absolute sm:-right-12 sm:top-2 sm:flex-col"
		>
			<ModeToggle />

			<Button
				href="https://github.com/1bye/time-picker-svelte"
				variant="ghost"
				size="sm"
				class="w-9 px-0"
			>
				<Github />
			</Button>
		</div>
	</div>
	<div
		class="container relative mx-auto flex max-w-3xl flex-1 flex-col gap-8 rounded-lg border border-border p-4 backdrop-blur-[2px]"
	>
		<div class="mx-auto mt-12 grid max-w-2xl gap-4 text-center">
			<h1 class="font-cal text-3xl">Time Picker</h1>
			<p class="text-muted-foreground">
				A <code>{`<TimePickerInput />`}</code> component built with Svelte and Shadcn UI or Headless.
			</p>
			<div>
				<DateTimePicker bind:date />
			</div>
		</div>
		<div class="flex min-h-full flex-1 flex-col">
			<div class="grid grid-cols-1 pb-4 md:grid-cols-2">
				<div class="grid pb-4 md:pb-0 md:pr-4">
					<div class="flex flex-col gap-3 border-b border-border pb-4">
						<h3 class="font-cal text-xl">Demo</h3>
						<TimePickerWrapper bind:time={time2} /><TimePicker12HourWrapper bind:time />
					</div>
					<div class="flex flex-col gap-3 pt-4">
						<ul class="ml-5 list-outside list-disc space-y-2 text-sm marker:text-muted-foreground">
							<li>
								Listens to <code>keydown</code> events
							</li>
							<li>Supports arrow navigation</li>
							<li>Formats date values</li>
							<li>Optimizes mobile keyboard</li>
						</ul>
					</div>
				</div>
				<div
					class="flex flex-col gap-3 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0"
				>
					<h3 class="font-cal text-xl">Get Started</h3>
					<ul class="ml-5 list-outside list-decimal space-y-2 text-sm marker:text-muted-foreground">
						<li>
							Install <a
								href="https://next.shadcn-svelte.com/docs/installation/"
								target="_blank"
								class="underline hover:no-underline"
							>
								shadcn/ui
							</a>
							(optional)
							and
							<a
								href="https://react-spectrum.adobe.com/internationalized/date/index.html"
								target="_blank"
								class="underline hover:no-underline"
							>
								@internationalized/date
							</a>
							include input component
							<a
								href="https://next.shadcn-svelte.com/docs/components/input"
								target="_blank"
								class="font-mono underline hover:no-underline"
							>
								Input
							</a>
							component (twelve-hour clocks also need a
							<a
								href="https://next.shadcn-svelte.com/docs/components/select"
								target="_blank"
								class="font-mono underline hover:no-underline"
							>
								Select
							</a>
							component)
						</li>
						<li>
							Copy & paste <a
								href="#./time-picker-utils.ts"
								class="font-mono underline hover:no-underline"
							>
								time-picker-utils.ts
							</a>
						</li>
						<li>
							Copy & paste <a
								href="#./time-picker-input.svelte"
								class="font-mono underline hover:no-underline"
							>
								time-picker-input.svelte
							</a>
						</li>
						<li>
							Define your <code>TimePicker</code> component (e.g.
							<a href="#./time-picker.svelte" class="font-mono underline hover:no-underline">
								time-picker-svelte
							</a>
							)
						</li>
					</ul>
				</div>
			</div>
			<div class="flex flex-col gap-3 border-t border-border pt-4">
				<h3 class="font-cal text-xl">Snippets</h3>

				<Tabs.Root bind:value={currentKey} class="w-full">
					<Tabs.List class="grid w-full grid-cols-4">
						{#each snippetKeys as snippetKey}
							<Tabs.Trigger value={snippetKey}>{snippetKey}</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</Tabs.Root>

				{#if snippets[currentKey]}
					<Accordion.Root type="single">
						{#each snippets[currentKey] as snippet (snippet.slug)}
							<Accordion.Item value={snippet.file}>
								<Accordion.Trigger id={snippet.file}>
									<code>{snippet.file}</code>
								</Accordion.Trigger>

								<Accordion.Content>
									<Snippet {...snippet} />
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				{/if}
			</div>
		</div>
		<div>
			<p class="text-center text-sm text-muted-foreground">
				Originally created by <a
					href="https://openstatus.dev"
					class="text-foreground underline hover:no-underline"
				>
					OpenStatus
				</a>

				<br />

				adapted to Svelte by
				<a href="https://github.com/1bye" class="text-foreground underline hover:no-underline">
					1bye
				</a>
			</p>
		</div>
	</div>
</main>

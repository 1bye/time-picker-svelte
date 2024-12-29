<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Background from './_background.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	// import OgImage from "./_og-image.svelte";

	import '../app.css';
	let { children } = $props();
</script>

<!-- <OgImage /> -->

<MetaTags
	title="Time picker"
	titleTemplate="%s | Svelte / SvelteKit"
	description="A simple svelte TimePicker component for shadcn/ui or headless. With 12 and 24 hour style "
	openGraph={{
		url: 'https://time-picker.nouro.app',
		title: 'Svelte time picker',
		description: 'A time picker component for your svelte app (shadcn/ui or headless)',
		images: [
			{
				url: 'https://pub-bfd2942eac21491fa22b1b53b0b35afe.r2.dev/time-picker-og-image.png',
				width: 800,
				height: 350,
				alt: 'Svelte time picker'
			}
		],
		siteName: 'Time picker | Nouro'
	}}
	twitter={{
		creator: '@1bye',
		site: 'https://time-picker.nouro.app',
		cardType: 'summary_large_image',
		title: 'Time picker',
		description: 'A time picker component for your svelte app (shad',
		image: 'https://pub-bfd2942eac21491fa22b1b53b0b35afe.r2.dev/time-picker-og-image.png',
		imageAlt: 'Svelte time picker'
	}}
/>

<ModeWatcher />

<Background>
	{@render children()}
</Background>

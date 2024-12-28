<script lang="ts">
	import { Copy, Check } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let props: {
        class: string;
        children: Snippet;
    } = $props();

	let ref = $state<HTMLPreElement | null>(null);
	let copied = $state(false);

	function onClick() {
		copied = true;

		const content = ref?.textContent;

		if (content) {
			navigator.clipboard.writeText(content);
		}
	}

	$effect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (copied) {
			timer = setTimeout(() => {
				copied = false;
			}, 2000);
		}

		return () => {
			clearTimeout(timer);
		};
	});
</script>

<div class="relative overflow-hidden">
	<button
		onclick={onClick}
		class={cn(
			`absolute right-4 top-4 rounded-md border border-transparent p-2 text-muted-foreground hover:border-border hover:text-foreground`,
			copied && 'text-foreground'
		)}
	>
		{#if !copied}
			<Copy class="size-4" />
		{:else}
			<Check class="size-4" />
		{/if}</button
	>
	<pre
		bind:this={ref}
		{...props}
		class={cn(
            "overflow-auto rounded border border-border bg-background p-4 text-sm",
            props.class
        )}>{@render props?.children?.()}</pre>
</div>

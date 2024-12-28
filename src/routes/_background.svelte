<script lang="ts">
	import { useMouseMove } from '$lib/hooks/use-mouse-move';
	import { onMount, type Snippet } from 'svelte';

    let {
        children
    }: {
        children?: Snippet;
    } = $props();

	onMount(() => {
		useMouseMove();
	});
</script>

<div class="fixed left-0 top-0 -z-50">
	<div class="sticky left-0 top-0 h-screen w-screen overflow-hidden">
		<div class="absolute inset-0 z-[-1] bg-muted-foreground/20" />
		<div
			class="bg-gradient-radial absolute left-[--x] top-[--y] z-[-1] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full from-muted-foreground/80 from-0% to-transparent to-90% blur-md"
		/>
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
			><defs
				><pattern id="dotted-pattern" width="16" height="16" patternUnits="userSpaceOnUse"
					><circle cx="2" cy="2" r="1" fill="black" /></pattern
				><mask id="dots-mask"
					><rect width="100%" height="100%" fill="white" /><rect
						width="100%"
						height="100%"
						fill="url(#dotted-pattern)"
					/></mask
				></defs
			><rect width="100%" height="100%" fill="hsl(var(--background))" mask="url(#dots-mask)" /></svg
		>
	</div>
</div>

{@render children?.()}

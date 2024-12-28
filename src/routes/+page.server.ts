import { loadAllSnippets } from '$lib/snippets-content';

export async function load() {
	return {
		snippets: await loadAllSnippets()
	};
}

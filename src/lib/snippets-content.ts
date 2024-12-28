import type { Snippet } from './types';
import { read } from '$app/server';

export async function loadAllSnippets(): Promise<Snippet[]> {
	const files = import.meta.glob('./snippets/**.*', {
		query: '?url',
        import: 'default',
		eager: true
	});

	const promises = Object.entries(files).map(async ([fileName, filePath]) => {
		const res = read(filePath as string);

		return {
			slug: filePath as string,
			file: fileName.replace("snippets/", ""),
			content: await res.text()
		};
	});

	return await Promise.all(promises);
}

import type { Snippet } from './types';
import { read } from '$app/server';

export async function loadAllSnippets(): Promise<Snippet[]> {
	const files = import.meta.glob('./snippets/**', {
		query: '?url',
        import: 'default',
		eager: true
	});

	const promises = Object.entries(files).map(async ([_fileName, filePath]) => {
		const fileName = _fileName.replace("snippets/", "")
		const res = read(filePath as string);

		const [,folder, name] = fileName.split("/");

		return {
			folder,
			slug: filePath as string,
			file: name,
			content: await res.text()
		};
	});

	return await Promise.all(promises);
}

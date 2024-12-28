<script lang="ts">
	import type { Snippet } from '$lib/types';
	import Pre from './pre.svelte';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';

	import css from 'highlight.js/lib/languages/css';
	import xml from 'highlight.js/lib/languages/xml';
	// import svelte from 'highlight.svelte';
	import typescript from 'highlight.js/lib/languages/typescript';

	const svelte = function (hljs) {
		const common_patterns = [
			{
				begin: /\$([a-zA-Z_][\w-]*)\s*\(/,
				className: 'title function_',
				endsWithParent: true,
				variants: [
					{
						begin: /\$([a-zA-Z_][\w-]*)\s*\(/,
						end: /\(/,
						returnBegin: true,
						excludeEnd: true,
						relevance: 10
					}
				]
			},
			{
				begin: /\b(bind|use|transition|in|out|animate|class|style):/gm,
				className: 'variable',
				relevance: 10
			}
		];

		return {
			subLanguage: 'xml',
			contains: [
				hljs.COMMENT('<!--', '-->', { relevance: 10 }),
				{
					begin: /<script(?!.*lang=["']ts["'])>/gm,
					end: /<\/script>/gm,
					subLanguage: 'javascript',
					excludeBegin: true,
					excludeEnd: true,
					contains: common_patterns
				},
				{
					begin: /<script\s+lang=["']ts["']>/gm,
					end: /<\/script>/gm,
					subLanguage: 'typescript',
					excludeBegin: true,
					excludeEnd: true,
					contains: common_patterns
				},
                {
					begin: /<script\s+lang=["']ts["']\s+module>/gm,
					end: /<\/script>/gm,
					subLanguage: 'typescript',
					excludeBegin: true,
					excludeEnd: true,
					contains: common_patterns
				},
				{
					begin: /^(\s*)(<style.*>)/gm,
					end: /^(\s*)(<\/style>)/gm,
					subLanguage: 'css',
					excludeBegin: true,
					excludeEnd: true
				},
				{
					begin: /\{/,
					end: /\}/,
					subLanguage: 'typescript',
					contains: [
						hljs.COMMENT(/\/\*/, /\*\//),
						{ begin: /\{/, end: /\}/, skip: true },
						{
							begin: /[#@/][a-zA-Z_][\w-]*/,
							className: 'keyword',
							relevance: 10
						}
					]
				}
			]
		};
	};

	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('svelte', svelte);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);

	let snippet: Snippet = $props();
</script>

<!-- <Markdown md={snippet.content} {plugins} /> -->

<Pre class="hi">{@html hljs.highlightAuto(snippet.content).value}</Pre>

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, squooshImageService } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	site: 'https://ckt1031.xyz',
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			[
				rehypeExternalLinks,
				{
					rel: ['nofollow'],
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
		remarkPlugins: [
			remarkGfm,
			remarkNormalizeHeadings,
			// @ts-expect-error
			remarkParse,
		],
	},
	integrations: [
		partytown(),
		tailwind(),
		react({
			experimentalReactChildren: true,
		}),
		sitemap(),
		mdx(),
		prefetch(),
		robotsTxt({
			sitemap: ['https://ckt1031.xyz/sitemap-index.xml'],
			policy: [
				{
					userAgent: '*',
					disallow: ['/404', '/api'],
				},
				{
					userAgent: '*',
					allow: ['/'],
				},
			],
		}),
	],
	image: {
		service: squooshImageService(),
	},
	vite: {
		plugins: [
			Icons({
				compiler: 'jsx',
				jsx: 'react',
			}),
		],
	},
});

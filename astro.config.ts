import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://sudoku.moe',
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [solidJs()],
	vite: {
		plugins: [tailwindcss()],
	},
});

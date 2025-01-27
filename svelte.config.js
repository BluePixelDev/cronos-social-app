import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({out: "build"}),

		alias: {
			"@src": "./src",
			"@components": "./src/components",
			"@lib": "./src/lib",
			"@util": "./src/lib/util",
			"@routes": "./src/routes",
			"@stores": "./src/lib/stores"
		}
	}
};

export default config;

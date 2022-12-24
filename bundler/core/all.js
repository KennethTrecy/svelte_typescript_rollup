import { DEVELOPMENT } from "./environments";
import esbuildPlugin from "rollup-plugin-esbuild-transform"
import sveltePlugin from "rollup-plugin-svelte"
import nodeResolvePlugin from "@rollup/plugin-node-resolve"

export default function(environment = DEVELOPMENT, generalPostPlugins = [
	/**
	 * The following are required to compile the Svelte components.
	 *
	 * See: https://www.npmjs.com/package/rollup-plugin-svelte
	 */
	sveltePlugin({

	}),
	nodeResolvePlugin({
		"browser": true,
		"exportConditions": [ "svelte" ],
		"extensions": [ ".svelte" ]
	}),

	/**
	 * Allows fast transformation of modules.
	 *
	 * See: https://www.npmjs.com/package/rollup-plugin-esbuild-transform
	 */
	esbuildPlugin([
		{
			"loader": "js"
		}
	])
]) {
	return [
		{
			"input": "src/app.svelte",
			"output": {
				"file": "dist/app.js",
				"format": "iife",
				"interop": "auto",
				"name": "app"
			},
			"plugins": [
				...generalPostPlugins
			]
		}
	];
}

import { join } from "path"
import autoPrepocess from "svelte-preprocess"
import sveltePlugin from "rollup-plugin-svelte"
import commonjsPlugin from "@rollup/plugin-commonjs"
import nodeResolvePlugin from "@rollup/plugin-node-resolve"
import esbuildPlugin from "rollup-plugin-esbuild-transform"
import { DEVELOPMENT } from "./environments";

export default function(environment = DEVELOPMENT, generalPostPlugins = [
	/**
	 * The following are required to compile the Svelte components.
	 *
	 * See: https://www.npmjs.com/package/rollup-plugin-svelte
	 */
	sveltePlugin({
		/**
		 * `svelte-preprocess` is also required to transpile Typescript.
		 *
		 * See:
		 * https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#typescript
		 */
		"preprocess": autoPrepocess({
			"typescript": {
				"tsconfigDirectory": join(__dirname, "../.."),
				"tsconfigFile": "tsconfig.json"
			}
		})
	}),
	nodeResolvePlugin({
		"browser": true,
		"exportConditions": [ "svelte" ],
		"extensions": [ ".svelte" ],
		"dedupe": [ "svelte" ]
	}),

	commonjsPlugin(),

	/**
	 * Allows fast transformation of modules.
	 *
	 * See: https://www.npmjs.com/package/rollup-plugin-esbuild-transform
	 */
	esbuildPlugin([
		{
			"loader": "ts",
			"tsconfig": join(__dirname, "../../tsconfig.json")
		},
		{
			"loader": "js",
			// Remove the comment below to minify the output code.
			// "minify": true,
			"output": true,
		}
	])
]) {
	return [
		{
			"input": "src/index.js",
			"output": {
				"file": "dist/index.js",
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

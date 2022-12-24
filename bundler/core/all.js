import { DEVELOPMENT } from "./environments";
import esbuildPlugin from "rollup-plugin-esbuild-transform"
import sveltePlugin from "rollup-plugin-svelte"
import nodeResolvePlugin from "@rollup/plugin-node-resolve"

export default function(environment = DEVELOPMENT, generalPostPlugins = [
	sveltePlugin({

	}),
	nodeResolvePlugin({
		"browser": true,
		"exportConditions": [ "svelte" ],
		"extensions": [ ".svelte" ]
	}),
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

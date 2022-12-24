import { DEVELOPMENT } from "./environments";
import esbuildPlugin from "rollup-plugin-esbuild-transform"

export default function(environment = DEVELOPMENT, generalPostPlugins = [
	esbuildPlugin([
		{
			"loader": "js"
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

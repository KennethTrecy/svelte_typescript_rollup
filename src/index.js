import App from "./app.svelte"

/**
 * This is similar to other UI frameworks on mounting their components.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started#inspecting_main.js_the_entry_point_of_our_app
 */
var app = new App({
	"target": document.body
})

export default app

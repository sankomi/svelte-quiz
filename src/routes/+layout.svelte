<script>
	import {fade} from "svelte/transition";

	export let data;
	$: pathname = data.pathname;

	const fadeIn = {
		x: 20,
		duration: 200,
		delay: 300,
	};
	const fadeOut = {
		x: -20,
		duration: 200,
	};
</script>

{#key pathname}
	<div in:fade={fadeIn} out:fade={fadeOut}>
		<slot/>
	</div>
{/key}

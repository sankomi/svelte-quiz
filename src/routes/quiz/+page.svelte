<svelte:head>
	<title>question {question.id} - quiz</title>
</svelte:head>

<script>
	import {onDestroy} from "svelte";
	import {goto} from "$app/navigation";
	import {answered} from "../../stores";

	export let data;

	answered.set([]);

	let time = 0;
	let question = data.questions;

	function answer(id, option) {
		answered.update(array => {
			array[id] = option;
			return array;
		});
	}

	function finish() {
		goto("/done");
	}
</script>

<h1>quiz</h1>
<p>time remaining: {time} seconds</p>
<h2>question {question.id}</h2>
<p>{question.text}</p>
<ul>
	{#each question.options as text, index}
		<li>
			<button on:click={() => answer(question.id, index)} disabled={$answered[question.id] === index}>{text}</button>
		</li>
	{/each}
</ul>
<button>prev</button>
<button on:click={finish}>finish</button>

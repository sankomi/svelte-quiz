<svelte:head>
	<title>question {question.id} - quiz</title>
</svelte:head>

<script>
	import {goto} from "$app/navigation";

	let time = 0;
	let question = {
		id: 1,
		text: "is this a question?",
		options: ["yes", "no", "maybee"],
	};

	function finish() {
		goto("/done");
	}
</script>

<h1>quiz</h1>
<p>time remaining: {time} seconds</p>
<h2>question {question.id}</h2>
<p>{question.text}</p>
<ul>
	{#each question.options as option}
		<li>
			<button>{option}</button>
		</li>
	{/each}
</ul>
<button>prev</button>
<button on:click={finish}>finish</button>
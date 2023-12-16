<svelte:head>
	<title>question {question.id} - quiz</title>
</svelte:head>

<script>
	import {onDestroy} from "svelte";
	import {goto} from "$app/navigation";
	import {answered} from "$lib/stores";

	export let data;

	let endTime = +new Date() + 10000;
	let remainTime = 10;
	let timer = setInterval(() => {
		remainTime = Math.floor((endTime - +new Date()) * 0.001);
		if (remainTime < 0) {
			remainTime = 0;
			goto("/done");
		}
	}, 50);
	onDestroy(() => clearInterval(timer));

	answered.set([]);

	let time = 0;
	let index = 0;
	let questions = data.questions;
	$: question = questions[index];

	function answer(id, option) {
		answered.update(array => {
			array[id] = option;
			return array;
		});
	}

	function next() {
		index++;
		if (index > questions.length) {
			index = questions.length - 1;
		}
	}

	function prev() {
		index--;
		if (index < 0) {
			index = 0;
		}
	}

	function finish() {
		goto("/done");
	}
</script>

<h1>quiz</h1>
<p>time remaining: {remainTime} seconds</p>
<h2>question {question.id}</h2>
<p>{question.text}</p>
<ul class="options">
	{#each question.options as text, index}
		<li>
			<button
				class:selected={$answered[question.id] === index}
				on:click={() => answer(question.id, index)}
				disabled={$answered[question.id] === index}
			>{text}</button>
		</li>
	{/each}
</ul>
<button on:click={prev} disabled={index <= 0}>prev</button>
{#if index >= questions.length - 1}
<button on:click={finish}>finish</button>
{:else}
<button on:click={next}>next</button>
{/if}

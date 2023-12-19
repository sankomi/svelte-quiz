<svelte:head>
	<title>question {question.id} - quiz</title>
</svelte:head>

<script>
	import {onDestroy} from "svelte";
	import {fade} from "svelte/transition";
	import {goto} from "$app/navigation";
	import {answered} from "$lib/stores";

	export let data;

	const fadeIn = {
		x: 20,
		duration: 200,
		delay: 300,
	};
	const fadeOut = {
		x: -20,
		duration: 200,
	};

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

	let time = 0;
	let index = 0;
	let questions = data.questions;
	$: question = questions[index];

	let answerFill = [];
	questions.forEach((question, index) => {
		answerFill[index] = {id: question.id, option: -1};
	});
	answered.set(answerFill);

	function answer(id, option) {
		answered.update(array => {
			array[index] = {id, option};
			return array;
		});
	}

	function jump(to) {
		index = to;
		if (index > questions.length) {
			index = questions.length - 1;
		} else if (index < 0) {
			index = 0;
		}
	}

	function next() {
		jump(index + 1);
	}

	function prev() {
		jump(index - 1);
	}

	function finish() {
		clearInterval(timer);
		goto("/done");
	}
</script>

<h1>quiz</h1>
<p>time remaining: {remainTime} seconds</p>
<h2>goto question</h2>
<ul class="buttons">
	{#each questions as question, i}
		<li>
			<button
				class:selected={index === i}
				on:click={() => jump(i)}
				disabled={index === i}
			>{i + 1}</button>
		</li>
	{/each}
</ul>
{#key question}
	<div in:fade={fadeIn} out:fade={fadeOut}>
		<h2>question {index + 1}</h2>
		<p>{question.text}</p>
		<ul class="buttons">
			{#each question.options as text, i}
				<li>
					<button
						class:selected={$answered[index].option === i}
						on:click={() => answer(question.id, i)}
						disabled={$answered[index].option === i}
					>{text}</button>
				</li>
			{/each}
		</ul>
		<div class="buttons">
			<button on:click={prev} disabled={index <= 0}>prev</button>
			<button on:click={next} disabled={index >= questions.length - 1}>next</button>
			<button on:click={finish}>finish</button>
		</div>
	</div>
{/key}

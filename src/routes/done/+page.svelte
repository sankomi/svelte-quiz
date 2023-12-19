<svelte:head>
	<title>done</title>
</svelte:head>

<script>
	import {answered} from "$lib/stores";

	export let data;
	const {questions, answers} = data;

	let score = 0;
	let total = answers.length;
	$: percent = total > 0? Math.round(100 * score / total): 0;

	let summary = [];

	$answered.forEach((answer, index) => {
		let summ = {};
		let question = findQuestion(answer.id);

		summ.question = question.text;
		summ.correct = question.options[answers[answer.id]];
		if (answer.option >= 0) {
			summ.your = question.options[answer.option];
		} else {
			summ.your = "not answered";
		}

		if (summ.your === summ.correct) {
			score++;
		}

		summary.push(summ);
	});

	function findQuestion(id) {
		return questions.find(question => question.id === id);
	}

</script>

<h1>done!</h1>
<p>your score is {score}/{total} ({percent}%)</p>
<h2>summary</h2>
<ul class="summary">
	{#each summary as summ, index}
		<li>
			<h3>question {index + 1}</h3>
			<p>{summ.question}</p>
			<p>answer: {summ.correct}</p>
			<p>your: {summ.your}</p>
		</li>
	{/each}
</ul>
<a href="/">go back</a>

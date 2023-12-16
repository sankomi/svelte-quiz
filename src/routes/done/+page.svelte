<svelte:head>
	<title>done</title>
</svelte:head>

<script>
	import {answered} from "$lib/stores";

	export let data;
	const answers = data.answers;

	let score = 0;
	let total = answers.length;
	$: percent = total > 0? Math.round(100 * score / total): 0;

	$answered.forEach((answer, id) => {
		if (answers[id] === answer) {
			score++;
		}
	});

</script>

<h1>done!</h1>
<p>your score is {score}/{total} ({percent}%)</p>
<a href="/">go back</a>

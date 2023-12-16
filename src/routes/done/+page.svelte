<svelte:head>
	<title>done</title>
</svelte:head>

<script>
	import {answered} from "../../stores";

	export let data;
	const answers = data.answers;

	let score = 0;
	let total = 0;

	$answered.forEach((answer, id) => {
		total++;
		if (answers[id] === answer) {
			score++;
		}
	});

</script>

<h1>done!</h1>
<p>your score is {score}/{total} ({Math.round(100 * score / total)}%)</p>
<a href="/">go back</a>

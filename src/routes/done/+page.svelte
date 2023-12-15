<svelte:head>
	<title>done</title>
</svelte:head>

<script>
	let score = 1;
	let total = 4;
</script>

<h1>done!</h1>
<p>your score is {score}/{total} ({Math.round(100 * score / total)}%)</p>
<a href="/">go back</a>
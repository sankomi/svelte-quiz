export default async function Component() {
	let data = await fetch(
		"http://localhost:3000/api/questions",
		{cache: "no-store"},
	)
		.then(res => res.json());

	let question = data.questions[0];

	return <>
		<h1>quiz</h1>
		<h2>question {question.id}</h2>
		<p>{question.text}</p>
		<ul>
			{question.options.map((option, index) => {
				return <li key={index}>{option}</li>;
			})}
		</ul>
	</>;
}

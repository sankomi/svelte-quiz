export default async function Component({params, searchParams}) {
	let data = await fetch(
		"http://localhost:3000/api/answer",
		{cache: "no-store"},
	)
		.then(res => res.json());

	return <>
		<h1>next quiz</h1>
		<p>answer is {data.answer}</p>
	</>;
}

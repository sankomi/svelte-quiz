import Questions from "./questions";

export default async function Quiz() {
	let data = await fetch(
		"http://localhost:3000/api/questions",
		{cache: "no-store"},
	)
		.then(res => res.json());

	return <>
		<h1>quiz</h1>
		<Questions data={data}/>
	</>;
}

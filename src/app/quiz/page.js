import Questions from "./questions";

export default async function Quiz() {
	let questions = await fetch("http://localhost:3000/api/questions")
		.then(res => res.json());

	return <>
		<h1>quiz</h1>
		<Questions questions={questions}/>
	</>;
}

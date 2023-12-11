import Link from "next/link";
import {redirect} from "next/navigation";

export default async function Done(req) {
	const quizId = req.searchParams.quizId;

	if (quizId) {
		let data = await fetch(
			`http://localhost:3000/api/questions?quizId=${quizId}`,
			{cache: "no-store"},
		)
			.then(res => res.json());
		
		return <>
			<h1>done!</h1>
			<p>your score is {data.score}</p>
			<Link href="/">go back</Link>
		</>;
	} else {
		redirect("/");
	}
}

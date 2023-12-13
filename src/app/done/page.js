import Link from "next/link";
import {redirect} from "next/navigation";

import Result from "./result";

export default async function Done(req) {
	const answers = await fetch("http://localhost:3000/api/answers")
		.then(res => res.json());

	return <>
		<h1>done!</h1>
		<Result answers={answers}/>
	</>;
}

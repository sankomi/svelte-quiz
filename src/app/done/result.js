"use client";

import {redirect} from "next/navigation";
import Link from "next/link";

export default function Result({answers}) {
	let sessionAnswers = [];
	try {
		sessionAnswers = JSON.parse(sessionStorage.getItem("answers"));
	} catch (err) {
		if (err instanceof ReferenceError) {
			console.error("cant find sessionStorage");
		} else {
			throw err;
		}
	}

	if (!sessionAnswers || !sessionAnswers.length) {
		return redirect("/");
	}

	let score = 0;
	let total = 0;
	for (let i = 0; i < answers.length; i++) {
		total++;

		if (sessionAnswers.length < i + 1) {
			continue;
		}

		if (answers[i] === sessionAnswers[i]) {
			score++;
		}
	}

	return <>
		<p>your score is {score}/{total} ({Math.round(100 * score / total)}%)</p>
		<Link href="/">go back</Link>
	</>;
}

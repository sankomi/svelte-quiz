"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Questions({data}) {
	const router = useRouter();

	const [index, setIndex] = useState(0);

	let question = data.questions[index];

	function select(optionIndex) {
		data.questions[index].answer = optionIndex;
		if (index < data.questions.length - 1) {
			setIndex(index + 1);
		} else {
			fetch("/api/questions", {
				header: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(data),
			})
				.then(() => {
					router.push(`/done?quizId=${data.quizId}`);
				});
		}
	}

	return <>
		<h2>question {question.id}</h2>
		<p>{question.text}</p>
		<ul>
			{question.options.map((option, index) => {
				return <li key={index}>
					<button onClick={() => select(index)}>{option}</button>
				</li>;
			})}
		</ul>
	</>;
}

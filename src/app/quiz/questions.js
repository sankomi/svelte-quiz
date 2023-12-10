"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Questions({questions}) {
	const router = useRouter();

	const [index, setIndex] = useState(0);

	let question = questions[index];

	function select(optionIndex) {
		questions[index].answer = optionIndex;
		if (index < questions.length - 1) {
			setIndex(index + 1);
		} else {
			router.push("/done");
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

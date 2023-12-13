"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Questions({questions}) {
	const router = useRouter();

	const [index, setIndex] = useState(0);
	const [answers, setAnswers] = useState([]);

	let question = questions[index];

	function select(answerIndex) {
		let answersCopy = answers;
		answersCopy[index] = answerIndex;
		sessionStorage.setItem("answers", JSON.stringify(answersCopy));

		if (index < questions.length - 1) {
			setIndex(index + 1);
			setAnswers([...answersCopy]);
		} else {
			router.push("/done");
		}
	}

	const [deadline, setDeadline] = useState(+new Date() + 10000);
	const [time, setTime] = useState(10);

	useEffect(() => {
		let interval = setInterval(() => {
			let t = Math.ceil((deadline - +new Date()) * 0.001);
			if (t >= 0) {
				setTime(t);
			} else {
				router.push("/done");
			}
		}, 50);
		return () => clearInterval(interval);
	}, []);

	return <>
		<h2>question {question.id}</h2>
		<p>time remaining: {time} seconds</p>
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

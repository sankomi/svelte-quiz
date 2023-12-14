"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Questions({questions}) {
	const router = useRouter();

	const [index, setIndex] = useState(0);
	const [selected, setSelected] = useState(null);
	const [answers, setAnswers] = useState([]);

	let question = questions[index];

	function select(answer) {
		let answersCopy = answers;
		answersCopy[index] = answer;
		sessionStorage.setItem("answers", JSON.stringify(answersCopy));
		setSelected(answer);
		setAnswers([...answersCopy]);
	}

	function next() {
		if (index < questions.length - 1) {
			setSelected(answers.length > index + 1? answers[index + 1]: null);
			setIndex(index + 1);
		} else {
			router.push("/done");
		}
	}

	function prev() {
		if (index > 0) {
			setSelected(answers[index - 1]);
			setIndex(index - 1);
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
					<button onClick={() => select(index)} disabled={index === selected}>{option}</button>
				</li>;
			})}
		</ul>
		<button onClick={prev} disabled={index === 0}>prev</button>
		<button onClick={next} disabled={selected === null}>
			{index < questions.length - 1? "next": "finish"}
		</button>
	</>;
}

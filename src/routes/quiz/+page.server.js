import {questions} from "$lib/server/qna";

export function load() {
	let copy = [...questions];
	let shuffled = [];

	while (copy.length > 0) {
		let index = Math.floor(Math.random() * copy.length);
		shuffled.push(copy.splice(index, 1)[0]);
	}

	return {questions: shuffled};
}

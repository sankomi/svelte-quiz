import {submits} from "../../global";

export async function GET(req) {
	const url = new URL(req.url);
	const quizId = url.searchParams.get("quizId");

	if (quizId && submits.has(quizId)) {
		return Response.json(submits.get(quizId));
	}

	let questions = {
		quizId: "" + +new Date() + Math.random(),
		questions: [
			new Question(1, "1 + 1 = ?", [1, 2, 3, 4, 5]),
			new Question(2, "2 + 2 = ?", [2, 3, 4, 5, 6]),
			new Question(3, "3 + 3 = ?", [3, 4, 5, 6, 7]),
			new Question(4, "4 + 4 = ?", [4, 5, 6, 7, 8]),
		],
	};

	return Response.json(questions);
}

class Question {

	constructor(id, text, options) {
		this.id = id;
		this.text = text;
		this.options = options;
	}

}

export async function POST(req) {
	let data = await req.json();
	let answers = data.questions.map(question => question.answer);

	let score = 0;
	let total = 0;
	for (let i = 0; i < answers.length; i++) {
		if (answers[i] === i + 1) {
			score++;
		}
		total++;
	}
	submits.set(data.quizId, {score, total});

	return Response.json(null);
}

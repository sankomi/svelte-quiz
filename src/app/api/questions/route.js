export async function GET(req) {
	let questions = {
		quizId: "" + +new Date() + Math.random(),
		questions: [
			new Question(1, "1 + 1 = ?", [2, 3, 4, 5, 6]),
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

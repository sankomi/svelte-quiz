export async function GET(req) {
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

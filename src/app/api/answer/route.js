export async function GET(req) {
	let answer = Math.floor(Math.random() * 100);

	return Response.json({answer});
}

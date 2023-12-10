import Link from "next/link";

export default async function Done() {
	return <>
		<h1>done!</h1>
		<p>thank you!</p>
		<Link href="/">go back</Link>
	</>;
}

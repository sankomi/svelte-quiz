import {NextResponse} from "next/server";

export function middleware(req) {
	if (["/quiz", "/done", "/api/questions"].includes(req.nextUrl.pathname)) {
		const response = NextResponse.next();
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}
	return NextResponse.next();
}

import { auth } from "@/auth";
import { NextResponse } from "next/server";
 
export default auth((req) => {
    const url = req.nextUrl.clone();

    if(req.auth &&  url.pathname === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (!req.auth && url.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ["/", "/groups/:path*", "/stats", "/login"]
}
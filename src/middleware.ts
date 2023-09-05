import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    //public page
    const isPublicPage =
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register";

    //token
    const token = request.cookies.get("token");
    // const token = request.cookies.get("token")?.value;

    // token not present in cookies
    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // token is present in cookies
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error: any) {
    return NextResponse.error();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register"],
};

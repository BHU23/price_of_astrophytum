import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("Token:", token);
  console.log("Role:", role);

  if (token && role) {
    try {
      const url = request.nextUrl.clone();

      if (role === "Admin" && url.pathname.startsWith("/customer")) {
        console.log("Redirecting Admin from Customer path");
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      if (role === "User" && url.pathname.startsWith("/admin")) {
        console.log("Redirecting User from Admin path");
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      const url = request.nextUrl.clone();
      url.pathname = "/error";
      return NextResponse.redirect(url);
    }
  } else {
    console.log("No token found, redirecting to login");
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};

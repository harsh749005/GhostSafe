import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const response = NextResponse.next();

    // Store decoded data in a cookie (can also use headers)
    response.cookies.set("user", JSON.stringify(payload), {
      httpOnly: false, // Make it accessible to JS on frontend
      path: "/",
    });

    return response;
  } catch (err) {
  console.error("Auth Middleware Error:", err); // ✅ now it's used
  return NextResponse.redirect(new URL("/login", request.url));
}
}

export const config = {
  matcher: ["/allitems", "/passwords", "/notes","/address","/bankaccountinfo","/paymentinfo","/settingspage"],
};

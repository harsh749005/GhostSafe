import { cookies } from "next/headers";
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function PUT(req) {
  try {
    const { name, email } = await req.json();
    console.log("Received body", name);
    const cookieStore = cookies();
    const userCookieRaw = cookieStore.get("user")?.value;
    const userCookie = JSON.parse(userCookieRaw);
    const id = userCookie.id;
    console.log(userCookie);
    // Example update (you'll need user ID or email to match user)

    // const result =
    //   await sql`SELECT * FROM ghostsafe_user WHERE email = ${email}`;
    // const user = result[0];

    // if (user) {
    //   return NextResponse.json(
    //     { error: "Email already exists" },
    //     { status: 404 }
    //   );
    // }
    await sql`UPDATE ghostsafe_user SET name = ${name}, email = ${email} WHERE id = ${id}`;

    const token = req.cookies.get("token")?.value;
    console.log(token);
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const response = NextResponse.next();

    // Store decoded data in a cookie (can also use headers)
    response.cookies.set("user", JSON.stringify(payload), {
      httpOnly: false, // Make it accessible to JS on frontend
      path: "/",
    });

    return NextResponse.json({ success: true },{status : 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update name" },
      { status: 500 }
    );
  }
}

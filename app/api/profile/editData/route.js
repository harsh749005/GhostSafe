import { cookies } from "next/headers";
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(req) {
  try {
    const { name, email } = await req.json();

    const cookieStore = await cookies();
    const userCookieRaw =  cookieStore.get("user")?.value;
    const userCookie = JSON.parse(userCookieRaw);
    const id = userCookie.id;
    const userKey = userCookie.userKey;
    console.log("ID hai",id);
    console.log("userKey hai",userKey);

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

    // Transaction: run both updates safely
  
      await sql`UPDATE ghostsafe_user SET name = ${name}, email = ${email} WHERE id = ${id}`;
      await sql`UPDATE ghostsafe_passworddata SET  owneremail = ${email} WHERE userkey = ${userKey}`;
      await sql`UPDATE ghostsafe_paymentcard SET  owneremail = ${email} WHERE userkey = ${userKey}`;
      await sql`UPDATE ghostsafe_address SET  owneremail = ${email} WHERE userkey = ${userKey}`;
      await sql`UPDATE ghostsafe_bankaccount SET  owneremail = ${email} WHERE userkey = ${userKey}`;
      await sql`UPDATE ghostsafe_securenotes SET  owneremail = ${email} WHERE userkey = ${userKey}`;


    const token = jwt.sign({ id, email, name,userKey }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("user", JSON.stringify(payload), {
      httpOnly: true, // consider making this true for security
      path: "/",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 500 }
    );
  }
}

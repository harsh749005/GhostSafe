import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Ideally move secret to .env
const JWT_SECRET =  process.env.JWT_SECRET;

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

    try {
        const result = await sql`SELECT * FROM ghostsafe_user WHERE email = ${email}`;
        const user = result[0];

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({ status: "success", message: "Logged in",user });

        // Set HttpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal error", details: error.message }, { status: 500 });
    }
}

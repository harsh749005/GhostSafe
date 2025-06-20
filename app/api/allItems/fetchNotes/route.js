import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const owneremail = searchParams.get("owneremail");
    console.log("Received Body", owneremail);

    try {
        const notes = await sql`SELECT * FROM ghostsafe_securenotes WHERE owneremail = ${owneremail}`;
        // console.log(user);

        if (!notes) {
            return NextResponse.json({ message: "Notes not found" }, { status: 404 });
        }
        console.log("UserID:", notes);

        return NextResponse.json({ message: "done", notes: notes }, { status: 200 });
    } catch (err) {
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: "fail", error: err.message }, { status: 500 });
    }
}

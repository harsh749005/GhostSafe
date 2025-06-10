// For Next.js app router (route.js)
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { id, name, username, password, url } = await req.json();
  await sql`
    UPDATE ghostsafe_passworddata
    SET name = ${name}, username = ${username}, password = ${password}, url = ${url}
    WHERE id = ${id}
  `;
  return NextResponse.json({ success: true },{status:200});
}

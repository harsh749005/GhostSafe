// For Next.js app router (route.js)
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { id, name,notes} = await req.json();

  try{

      await sql`
      UPDATE ghostsafe_securenotes
      SET name = ${name}, notes = ${notes}
      WHERE id = ${id}
      `;
      return NextResponse.json({ success: true },{status:200});
    }catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

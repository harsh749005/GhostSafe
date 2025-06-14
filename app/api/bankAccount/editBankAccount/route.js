// For Next.js app router (route.js)
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const {
    id,
    name,
    bankname,
    type,
    number,
    swiftcode,
    ibannumber,
    branchname,
    branchaddress,
    pinnumber,
    notes,
  } = await req.json();

  try {

    await sql`
      UPDATE ghostsafe_bankaccount
      SET 
          name = ${name},
    bankname = ${bankname},
    type = ${type},
    number = ${number},
    swiftcode = ${swiftcode},
    ibannumber = ${ibannumber},
    branchname = ${branchname},
    branchaddress = ${branchaddress},
    pinnumber = ${pinnumber},
    notes = ${notes}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

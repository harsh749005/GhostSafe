// For Next.js app router (route.js)
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const {
    id,
    name,
    title,
    firstname,
    middlename,
    lastname,
    username,
    gender,
    birthday,
    company,
    address1,
    address2,
    owneremail,
  } = await req.json();

  try {
    // Combine birthday object into "YYYY-MM-DD"
    const fullBirthday = `${birthday.year}-${birthday.month}-${birthday.day}`;

    await sql`
      UPDATE ghostsafe_address
      SET 
        name = ${name},
        title = ${title},
        firstname = ${firstname},
        middlename = ${middlename},
        lastname = ${lastname},
        username = ${username},
        gender = ${gender},
        birthday = ${fullBirthday},
        company = ${company},
        address1 = ${address1},
        address2 = ${address2},
        owneremail = ${owneremail}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

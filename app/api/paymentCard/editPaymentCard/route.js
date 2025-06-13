// For Next.js app router (route.js)
import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const {
    id,
    name,
    nameoncard,
    type,
    number,
    securitycode,
    startdate,
    expirationdate,
    notes,
    owneremail,
  } = await req.json();
console.log("Recived body ",    id,
    name,
    nameoncard,
    type,
    number,
    securitycode,
    startdate,
    expirationdate,
    notes,
    owneremail,)
    const startmonth = startdate.month;
    const startyear = startdate.year;
    const expirationmonth = expirationdate.month;
    const expirationyear = expirationdate.year;
    console.log("month",startmonth);
  try {
    // Combine birthday object into "YYYY-MM-DD"

    await sql`
  UPDATE ghostsafe_paymentcard
  SET 
    name = ${name},
    nameOnCard = ${nameoncard},
    type = ${type},
    number = ${number},
    securityCode = ${securitycode},
    startmonth = ${startmonth},
    startyear=${startyear},
    expirationmonth = ${expirationmonth},
    expirationyear=${expirationyear},
    notes = ${notes},
    owneremail = ${owneremail}
  WHERE id = ${id}
`;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

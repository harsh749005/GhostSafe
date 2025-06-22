"use server";
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";
import { ensureDBReady } from "../../../lib/db";

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    nameoncard,
    type,
    number,
    securitycode,
    startdate,
    expirationdate,
    notes,
    owneremail,
    userkey
  } = body.formData;
  console.log("Received Body : ", body);
  const { month: startMonth, year: startYear } = startdate || {};
  const { month: expirationMonth, year: expirationYear } = expirationdate || {};

  if (!name || !nameoncard || !owneremail || !startdate || !expirationdate) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  // console.log(body);
  try {
    await ensureDBReady();

    // Optional: check if similar address data already exists (based on name/email/username)
    // const existing = await sql`
    //   SELECT * FROM ghostsafe_address
    //   WHERE owneremail = ${owneremail} AND username = ${username} AND name = ${name}
    // `;

    // if (existing.length > 0) {
    //   return NextResponse.json(
    //     {
    //       status: "fail",
    //       message: "Address entry already exists",
    //     },
    //     { status: 409 }
    //   );
    // }

    // Insert new address data
    const result = await sql`
  INSERT INTO ghostsafe_paymentcard (
    name,
    nameoncard,
    type,
    number,
    securitycode,
    startMonth,
    startYear,
    expirationMonth,
    expirationYear,
    notes,
    owneremail,
    userkey
  ) VALUES (
    ${name},
    ${nameoncard},
    ${type},
    ${number},
    ${securitycode},
    ${startMonth},
    ${startYear},
    ${expirationMonth},
    ${expirationYear},
    ${notes},
    ${owneremail},
    ${userkey}
  )
`;

    console.log(result);
    return NextResponse.json(
      {
        status: "success",
        message: "Payment data stored successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Error inserting payment data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

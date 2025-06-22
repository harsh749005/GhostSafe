"use server";
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";
import { ensureDBReady } from "../../../lib/db";

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    title,
    firstname,
    middlename,
    lastname,
    username,
    birthday,
    gender,
    company,
    address1,
    address2,
    owneremail,
    userkey
  } = body.formData;

  if (!name || !username || !owneremail) {
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

    // Combine birthday fields into a single string
    const fullBirthday = `${birthday.year}-${birthday.month}-${birthday.day}`;
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
      INSERT INTO ghostsafe_address (
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
        userkey
      ) VALUES (
        ${name},
        ${title},
        ${firstname},
        ${middlename},
        ${lastname},
        ${username},
        ${gender},
        ${fullBirthday},
        ${company},
        ${address1},
        ${address2},
        ${owneremail},
        ${userkey}
      )
    `;
    console.log(result);
    return NextResponse.json(
      {
        status: "success",
        message: "Address data stored successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Error inserting address data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

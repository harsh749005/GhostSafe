"use server";
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";
import { ensureDBReady } from "../../../lib/db";


export async function POST(req) {
  const body = await req.json();

  const { name , notes , owneremail ,userkey} = body.formData;
  // console.log("Received body:", body);

  if ( !name || !notes  || !owneremail) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  try {

    await ensureDBReady();
console.log("ha pass");
    const result =
      await sql`SELECT * FROM ghostsafe_securenotes WHERE name=${name} AND  owneremail=${owneremail} AND notes=${notes}`;
    const passwordData = result[0];
    // console.log(result);
    // console.log(passwordData);
  

      if (passwordData) {
        return NextResponse.json(
          {
            status: "Fail",
            message: "Data already exist",
          },
          { status: 409 }
        );
      }
    
    await sql`INSERT INTO ghostsafe_securenotes (name,notes,owneremail,userkey) VALUES (${name},${notes}, ${owneremail},${userkey})`;
    // console.log(result);
    return NextResponse.json(
      {
        status: "success",
        message: "Notes Stored",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Error inserting data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

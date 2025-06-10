"use server";
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";
import { ensureDBReady } from "../../../lib/db";


export async function POST(req) {
  const body = await req.json();

  const { url, name, username, password, owneremail } = body.formData;
  // console.log("Received body:", body);

  if (!url || !name || !username || !password || !owneremail) {
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
      await sql`SELECT * FROM ghostsafe_passworddata WHERE url=${url} AND  owneremail=${owneremail} AND username=${username} AND password=${password}`;
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
    
    await sql`INSERT INTO ghostsafe_passworddata (url, name, username,password,owneremail) VALUES (${url},${name},${username}, ${password}, ${owneremail})`;
    // console.log(result);
    return NextResponse.json(
      {
        status: "success",
        message: "Data Stored",
      },
      { status: 201 }
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

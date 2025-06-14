"use server";
import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";
import { ensureDBReady } from "../../../lib/db";

export async function POST(req) {
  const body = await req.json();

  const {
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
    owneremail,
  } = body.formData;
  console.log("Received body:", body);

  if (!bankname || !name || !swiftcode || !ibannumber || !owneremail) {
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

    await sql`INSERT INTO ghostsafe_bankaccount ( name,bankname,type,number,swiftcode,ibannumber,branchname,branchaddress,pinnumber,notes,owneremail) VALUES (${name},${bankname},${type}, ${number},${swiftcode},${ibannumber},${branchname},${branchaddress},${pinnumber},${notes}, ${owneremail})`;
    
    return NextResponse.json(
      {
        status: "success",
        message: "Data Stored",
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

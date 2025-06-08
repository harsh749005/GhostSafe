"use server";
import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import { ensureDBReady } from "../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body =  await req.json();
  const { username, email, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    await ensureDBReady();
    
    const result = await sql `SELECT * FROM ghostsafe_user WHERE email=${email}`;
    const user = result[0];
    if (!user) {
      await sql`INSERT INTO ghostsafe_user (name, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;
      // console.log(result);
      return NextResponse.json({
        status: "success",
        message: "User registered",
      },{status:201});
    }
    else{

      return NextResponse.json({
        status: "Fail",
        message: "User already exist",
      },{status:409});
      
    }

  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "Error inserting data",
      error: error.message,
    },{status:500});
  }
}

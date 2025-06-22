"use server";
import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import { ensureDBReady } from "../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body =  await req.json();
  const { username, email, password } = body;

  try {
        const generateKey = () => {
      let str = "QWERTYUIOPLKJHGFDSAZXCVBNM";
      let special = "!@#$%^&*()";
      let num = "1234567890";
      let key = "";
      for (let i = 0; i < 10; i++) {
        let strran = Math.floor(Math.random() * 26);
        let specialran = Math.floor(Math.random() * 10);
        let numran = Math.floor(Math.random() * 10);
        key = key + str[strran] + special[specialran] + num[numran];
      }
      return key;
    };
    const userKey = generateKey();
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    await ensureDBReady();
    
    const result = await sql `SELECT * FROM ghostsafe_user WHERE email=${email}`;
    const user = result[0];
    if (!user) {
      await sql`INSERT INTO ghostsafe_user (name, email, password,userkey) VALUES (${username}, ${email}, ${hashedPassword},${userKey})`;
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

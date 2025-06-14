import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";


export async function GET(req){
    try{

        const { searchParams } = new URL(req.url);
        const owneremail = searchParams.get("owneremail");
        
        
        if (!owneremail) {
            return NextResponse.json({
                status: "fail",
                message: "Missing owneremail parameter",
            }, { status: 400 });
        }
        
        const result = await sql `SELECT * FROM ghostsafe_bankaccount WHERE owneremail=${owneremail}`;
        return   NextResponse.json({status:"success",message:"Data Fetched",result:result},{status:200});
    }catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "Error fetching data",
      error: error.message,
    }, { status: 500 });
  }
}
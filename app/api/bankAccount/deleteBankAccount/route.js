import { sql } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if(!id){
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
  
  
    try{
         await sql`DELETE FROM ghostsafe_bankaccount WHERE id=${id}`;
        return NextResponse.json({ success: true }, { status: 200 });
    }catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }  
}

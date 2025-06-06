import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({
    status: "success",
    message: "Logged Out",
  });

  response.cookies.delete("token");

  return response;
}

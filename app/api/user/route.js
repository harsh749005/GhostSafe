// app/api/user/route.js (or pages/api/user.js)
import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ user });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

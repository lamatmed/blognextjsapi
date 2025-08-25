// src/lib/auth.ts
import jwt from "jsonwebtoken";

export function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1]; // format: Bearer xxx
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string };
  } catch {
    return null;
  }
}

//app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  return NextResponse.json({ token, user: { id: user.id, email: user.phone, name: user.name, name: user.name  } });
}

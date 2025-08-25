// src/app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET → liste des users
export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
  });
  return NextResponse.json(users);
}

// POST → créer un user
export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    return NextResponse.json({ error: "User already exists or invalid data" }, { status: 400 });
  }
}

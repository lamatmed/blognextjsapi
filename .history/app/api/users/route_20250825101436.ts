/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/users/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

// GET → liste des users
export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, phone: true, name: true }
  });
  return NextResponse.json(users);
}

// POST → créer un user
export async function POST(req: Request) {
  try {
    const { phone, password, name } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    return NextResponse.json({ error: "User already exists or invalid data" }, { status: 400 });
  }
}

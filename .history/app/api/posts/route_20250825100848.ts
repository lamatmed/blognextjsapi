/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/blogs/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET → liste articles
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(posts);
}

// POST → créer un article
export async function POST(req: Request) {
  try {
    const { title, content, userId } = await req.json();

    const post = await prisma.post.create({
      data: { title, content, userId },
    });

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Error creating post" }, { status: 400 });
  }
}

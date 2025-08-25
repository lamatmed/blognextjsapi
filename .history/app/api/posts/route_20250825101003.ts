// src/app/api/blogs/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// GET → liste des blogs
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

// POST → créer un blog (auth requis)
export async function POST(req: Request) {
  const decoded = verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();

  const post = await prisma.post.create({
    data: {
      title,
      content,
      userId: decoded.userId,
    },
  });

  return NextResponse.json(post);
}

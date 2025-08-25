// app/api/posts/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// GET → liste des blogs

export async function GET(req: Request) {
  const decoded = verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Filtrer les posts par utilisateur connecté
  const posts = await prisma.post.findMany({
    where: { userId: decoded.userId },
    include: { user: { select: { id: true, name: true, phone: true, image:true } } },
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

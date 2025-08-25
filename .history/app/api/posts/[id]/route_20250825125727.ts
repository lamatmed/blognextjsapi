import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

// GET un blog
export async function GET(req: Request, { params }: Params) {
  const { id } = await params; // Attendre les paramètres
  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, phone: true, image: true } } }
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PUT → modifier un blog (auth + propriétaire)
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params; // Attendre les paramètres
  const decoded = verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (post.userId !== decoded.userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { title, content } = await req.json();
  const updated = await prisma.post.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}

// DELETE → supprimer un blog (auth + propriétaire)
export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params; // Attendre les paramètres
  const decoded = verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (post.userId !== decoded.userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
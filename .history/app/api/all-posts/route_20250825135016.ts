import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { 
      user: { 
        select: { 
          id: true, 
          name: true, 
          phone: true,
          image: true  // Ajoutez ceci si vous voulez inclure l'image de l'utilisateur
        } 
      } 
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}
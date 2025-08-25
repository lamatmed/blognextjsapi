// Alternative: Récupérez les posts directement depuis la base de données
import { prisma } from "@/lib/db";

async function getPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    include: { 
      user: { 
        select: { 
          id: true, 
          name: true, 
          phone: true,
          image: true
        } 
      } 
    },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}
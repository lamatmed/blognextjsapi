import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Post } from '@/types';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://blognextjsapi.vercel.app//api/posts/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch post');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  // Calculer le temps de lecture (environ 200 mots par minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Bouton de retour */}
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux articles
        </Link>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Image de l'article si disponible */}
          {post.image && (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            {/* En-tête de l'article */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-4">
                {/* Avatar de l'utilisateur */}
                {post.user.image ? (
                  <div className="relative h-10 w-10 mr-3">
                    <Image
                      src={post.user.image}
                      alt={post.user.name || post.user.phone}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                )}
                
                <div>
                  <p className="font-medium text-gray-900">
                    {post.user.name || post.user.phone}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{readingTime} min de lecture</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="whitespace-pre-line">{post.content}</div>
            </div>
          </div>
        </article>

        {/* Section de commentaires (optionnelle) */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Commentaires (0)
          </h2>
          <p className="text-gray-500 text-center py-8">
            La fonctionnalité de commentaires sera bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
}

// Génération des métadonnées pour le référencement
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }
  
  return {
    title: `${post.title} | Blog Modern`,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + '...',
      images: post.image ? [post.image] : [],
      type: 'article',
    },
  };
}
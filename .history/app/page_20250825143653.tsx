/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { ArrowRight, Calendar, User, PenTool, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/all-posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Impossible de charger les articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Sparkles className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">Blog Modern</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Découvrez des articles inspirants
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Explorez une collection d'articles passionnants écrits par notre communauté de créateurs.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Gérer mes articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Articles récents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières publications de notre communauté.
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <PenTool className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-500">
              {error}
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <PenTool className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun article pour le moment
            </h3>
            <p className="text-gray-500">
              Soyez le premier à publier un article!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  {/* Image de l'article si disponible */}
                  {post.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        {/* Avatar de l'utilisateur */}
                        {post.user.image ? (
                          <div className="relative h-6 w-6 mr-2">
                            <Image
                              src={post.user.image}
                              alt={post.user.name || post.user.phone}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <User className="h-4 w-4 mr-1" />
                        )}
                        <span>{post.user.name || post.user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <time dateTime={post.createdAt}>
                          {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      {posts.length > 0 && (
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à partager vos idées?
            </h2>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Rejoignez notre communauté et commencez à écrire dès aujourd'hui.
            </p>
            <Link
              href="/posts"
              className="inline-flex items-center bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Commencer à écrire
              <PenTool className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
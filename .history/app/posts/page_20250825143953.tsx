/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useContext } from 'react';
import { Post } from '@/types';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Calendar, 
  User, 
  FileText,
  Loader,
  AlertCircle
} from 'lucide-react';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  // Rediriger si non connecté
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [fetchPosts, isLoggedIn]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.status === 401) {
        // Token invalide ou expiré
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
        return;
      }
      
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      setError('Impossible de charger les articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour effectuer cette action');
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingPost 
        ? `/api/posts/${editingPost.id}`
        : '/api/posts';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', content: '' });
        setEditingPost(null);
        fetchPosts();
      } else if (response.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError('Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article?')) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour effectuer cette action');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchPosts();
      } else if (response.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur de connexion');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Articles</h1>
            <p className="text-gray-600 mt-2">Créez et gérez vos publications</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 sm:mt-0 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <FileText className="h-4 w-4 mr-1" />
            Voir tous les articles ({posts.length})
          </button>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            {editingPost ? (
              <>
                <Edit2 className="h-5 w-5 mr-2 text-indigo-600" />
                Modifier l'article
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2 text-indigo-600" />
                Nouvel Article
              </>
            )}
          </h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center mb-4">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                placeholder="Titre de votre article"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea
                id="content"
                placeholder="Contenu de votre article..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                rows={5}
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-300 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    {editingPost ? 'Mettre à jour' : 'Publier'}
                  </>
                )}
              </button>
              
              {editingPost && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPost(null);
                    setFormData({ title: '', content: '' });
                  }}
                  className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-xl transition-colors duration-300"
                >
                  <X className="h-4 w-4 mr-1" />
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Liste des articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos Articles</h2>
          
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
              <p className="text-gray-500">Commencez par créer votre premier article!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.user.name || post.user.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setFormData({
                          title: post.title,
                          content: post.content,
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-xl transition-colors duration-300"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-xl transition-colors duration-300"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
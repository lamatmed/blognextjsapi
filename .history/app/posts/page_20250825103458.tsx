// app/posts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

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
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Posts</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingPost ? 'Update' : 'Create'} Post
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={() => {
                setEditingPost(null);
                setFormData({ title: '', content: '' });
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>By: {post.user.name || post.user.phone}</p>
              <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingPost(post);
                  setFormData({
                    title: post.title,
                    content: post.content,
                  });
                }}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
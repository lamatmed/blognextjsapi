// app/page.tsx
import Link from 'next/link';

interface User {
  id: string;
  phone: string;
  name?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  user: User;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Home() {
  let posts: Post[] = [];
  
  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/posts"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Manage Posts
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 100)}...
            </p>
            <div className="text-sm text-gray-500">
              <p>By: {post.user.name || post.user.phone}</p>
              <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
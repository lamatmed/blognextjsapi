// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Blog App
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/"
              className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-700 transition duration-300"
            >
              Home
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts"
                  className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-700 transition duration-300"
                >
                  My Posts
                </Link>
                <div className="py-2 px-4 font-medium text-gray-700">
                  Hello, {user?.name || user?.phone}
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="py-2 px-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
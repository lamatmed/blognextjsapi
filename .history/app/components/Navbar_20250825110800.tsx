// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, FileText, User, LogIn, UserPlus, LogOut } from 'lucide-react';

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
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-xl font-semibold text-gray-900">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Application de Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Accueil
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Mes Articles
                </Link>
                <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                  <User className="h-4 w-4 mr-1" />
                  Bonjour, {user?.name || user?.phone}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
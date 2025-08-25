// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { 
  Home, 
  FileText, 
  User, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu,
  X,
  BookOpen
} from 'lucide-react';


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center text-xl font-bold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Application de Blog
              </Link>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    href="/posts"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Mes Articles
                  </Link>
                  <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                    <User className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="max-w-xs truncate">Bonjour, {user?.name || user?.phone}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md hover:from-blue-700 hover:to-blue-600 transition-colors duration-200 shadow-sm"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Inscription
                  </Link>
                </>
              )}
            </div>

            {/* Bouton menu mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-2" />
                Accueil
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    href="/posts"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Mes Articles
                  </Link>
                  <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    Bonjour, {user?.name || user?.phone}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md hover:from-blue-700 hover:to-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
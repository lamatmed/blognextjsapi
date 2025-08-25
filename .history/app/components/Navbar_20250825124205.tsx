'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  BookOpen,
  PenTool,
  Sparkles
} from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-gradient-to-r from-indigo-600 to-purple-600 py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center text-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-white/30 rounded-lg blur opacity-30"></div>
                  <div className="relative flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg">
                    <Sparkles className="h-6 w-6 mr-2" />
                    <span className="hidden sm:inline">Blog Modern</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white hover:bg-white/10 group"
              >
                <Home className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
                Accueil
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    href="/posts"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white hover:bg-white/10 group"
                  >
                    <PenTool className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
                    Mes Articles
                  </Link>
                  <div className="flex items-center px-4 py-2 text-sm text-white/90">
                    {user?.image ? (
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          src={user.image}
                          alt={user.name || user.phone}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mr-2">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                    <span className="max-w-xs truncate">{user?.name || user?.phone}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-all duration-200 shadow-md hover:shadow-lg ml-2"
                  >
                    <LogOut className="h-5 w-5 mr-1.5" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white hover:bg-white/10 group"
                  >
                    <LogIn className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg ml-2 group"
                  >
                    <UserPlus className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
                    Inscription
                  </Link>
                </>
              )}
            </div>

            {/* Bouton menu mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200"
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
          <div className="md:hidden bg-gradient-to-b from-indigo-600 to-purple-700 shadow-xl">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                href="/"
                className="flex items-center px-3 py-3 text-base font-medium text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Accueil
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    href="/posts"
                    className="flex items-center px-3 py-3 text-base font-medium text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PenTool className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    Mes Articles
                  </Link>
                  <div className="flex items-center px-3 py-3 text-base font-medium text-white">
                    {user?.image ? (
                      <div className="relative w-8 h-8 mr-3">
                        <Image
                          src={}
                          alt={user.name || user.phone}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mr-3">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    Bonjour, {user?.name || user?.phone}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-3 text-base font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-all duration-200 group"
                  >
                    <LogOut className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-3 text-base font-medium text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center px-3 py-3 text-base font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
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
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, User, BookOpen, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, login } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Books', href: '/books' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    await login(loginEmail || 'advocate@supremecourt.in');
    setIsLoggingIn(false);
    setAuthModalOpen(false);
    setLoginEmail('');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAF8]/90 backdrop-blur-md shadow-md border-b border-[#1B2A4A]/10 py-3'
            : 'bg-[#FAFAF8]/70 backdrop-blur-sm border-b border-[#1B2A4A]/5 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded-lg px-1 py-0.5"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">⚖️</span>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl tracking-tight text-[#1B2A4A] group-hover:text-[#C9A84C] transition-colors">
                  LexBooks
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-[#C9A84C] -mt-1 uppercase">
                  India Law Library
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#1B2A4A] font-semibold'
                        : 'text-[#1A1A2E]/80 hover:text-[#1B2A4A] hover:bg-[#1B2A4A]/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#C9A84C] rounded-full animate-in fade-in duration-200" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Legal Books and Precedents"
                className="p-2 rounded-lg text-[#1B2A4A]/80 hover:text-[#1B2A4A] hover:bg-[#1B2A4A]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Auth Button */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-[#1B2A4A]/10 text-[#1B2A4A] hover:bg-[#1B2A4A]/15 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
                    <span className="truncate max-w-[120px]">{user?.name || 'Dashboard'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    aria-label="Log out"
                    title="Sign Out"
                    className="p-2 rounded-lg text-[#1B2A4A]/70 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  leftIcon={<User className="w-4 h-4" />}
                >
                  Advocate Login
                </Button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search"
                className="p-2 rounded-lg text-[#1B2A4A]/80 hover:text-[#1B2A4A] hover:bg-[#1B2A4A]/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 rounded-lg text-[#1B2A4A] hover:bg-[#1B2A4A]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1B2A4A]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAFAF8] shadow-2xl flex flex-col z-10 border-l border-[#C9A84C]/30 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1B2A4A]/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                <span className="font-heading font-bold text-xl text-[#1B2A4A]">LexBooks</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-lg text-[#1B2A4A]/70 hover:text-[#1B2A4A] hover:bg-[#1B2A4A]/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1B2A4A] text-white font-semibold'
                        : 'text-[#1A1A2E] hover:bg-[#1B2A4A]/5 hover:text-[#1B2A4A]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#1B2A4A]/10 my-4">
                <Link
                  href="/books"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#1A1A2E] hover:bg-[#1B2A4A]/5"
                >
                  <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                  <span>Browse Treatise Catalog</span>
                </Link>
              </div>
            </nav>

            {/* Footer / Auth in Mobile Drawer */}
            <div className="p-5 border-t border-[#1B2A4A]/10 bg-white/50">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="w-8 h-8 rounded-full bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center font-bold text-sm">
                      {user?.name?.[0] || 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-[#1B2A4A] truncate">{user?.name}</p>
                      <p className="text-xs text-[#5A607F] truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push('/dashboard');
                    }}
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  leftIcon={<User className="w-4 h-4" />}
                >
                  Advocate Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Search Legal Library"
        description="Search across Supreme Court commentaries, bare acts, penal laws, and corporate treatises."
        maxWidth="lg"
      >
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <Input
            autoFocus
            label="Search Query"
            placeholder="e.g., Constitution, Penal Code, Tax, Injunction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#5A607F]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 text-[10px]">Enter</kbd> to search
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSearchModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" size="sm" type="submit">
                Search Catalog
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Quick Advocate Login Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Advocate & Scholar Sign In"
        description="Access institutional subscriptions, digital annotations, and case law updates."
        maxWidth="md"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="Bar Council / Official Email"
            type="email"
            placeholder="advocate@barcouncil.org.in"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            helperText="Demo mode: Enter any email to instantly sign in."
          />
          <div className="pt-2 flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              isLoading={isLoggingIn}
            >
              Access Legal Library
            </Button>
            <p className="text-center text-xs text-[#5A607F]">
              By signing in, you agree to LexBooks Legal Research Terms of Use.
            </p>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Navbar;

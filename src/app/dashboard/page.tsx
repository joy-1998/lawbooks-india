'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Download,
  CreditCard,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  LogOut,
  ExternalLink,
  Library,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAllBooks, Book } from '@/lib/books-data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type DashboardTab = 'books' | 'downloads' | 'subscription';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('books');

  // Protect route
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  const allBooks = getAllBooks();

  // Find user's purchased books
  const purchasedBooks: Book[] = user?.purchasedBooks?.length
    ? allBooks.filter(
        (b) =>
          user.purchasedBooks.includes(String(b.id)) ||
          user.purchasedBooks.includes(b.slug)
      )
    : [];

  // Mock download trigger
  const handleDownloadPdf = (book: Book) => {
    const blob = new Blob([`${book.title}\nAuthor: ${book.author}\n\n${book.longDescription}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.slug}-lexbooks-authenticated.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#FAFAF8] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#1B2A4A] border-t-[#C9A84C] rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#5A607F] font-medium">Loading chamber credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Welcome Banner */}
        <div className="bg-gradient-to-r from-[#1B2A4A] via-[#1F335A] to-[#121E36] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-[#C9A84C]">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C9A84C] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Chamber Portal • {user?.role || 'Advocate Member'}</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#FAFAF8]">
              Welcome, {user?.name || 'Advocate'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Connected as <span className="font-mono text-[#C9A84C]">{user?.email}</span>. Manage your treatises, offline courtroom briefs, and subscription privileges.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 self-start md:self-auto">
            <Link href="/books">
              <Button variant="secondary" size="sm" className="font-semibold shadow-md">
                Explore More Treatises
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="border-b border-[#1B2A4A]/10">
          <nav className="flex space-x-4 sm:space-x-8" aria-label="Dashboard Tabs">
            <button
              type="button"
              onClick={() => setActiveTab('books')}
              className={`pb-4 px-1 text-sm sm:text-base font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'books'
                  ? 'border-[#C9A84C] text-[#1B2A4A]'
                  : 'border-transparent text-[#5A607F] hover:text-[#1B2A4A]'
              }`}
            >
              <Library className="w-4 h-4 text-[#C9A84C]" />
              <span>My Books ({purchasedBooks.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('downloads')}
              className={`pb-4 px-1 text-sm sm:text-base font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'downloads'
                  ? 'border-[#C9A84C] text-[#1B2A4A]'
                  : 'border-transparent text-[#5A607F] hover:text-[#1B2A4A]'
              }`}
            >
              <Download className="w-4 h-4 text-[#C9A84C]" />
              <span>Downloads</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('subscription')}
              className={`pb-4 px-1 text-sm sm:text-base font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'subscription'
                  ? 'border-[#C9A84C] text-[#1B2A4A]'
                  : 'border-transparent text-[#5A607F] hover:text-[#1B2A4A]'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#C9A84C]" />
              <span>Subscription & Chamber Plan</span>
            </button>
          </nav>
        </div>

        {/* TAB 1: MY BOOKS */}
        {activeTab === 'books' && (
          <section className="space-y-6">
            {purchasedBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl p-6 border border-[#1B2A4A]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="category" size="sm">
                          {book.category}
                        </Badge>
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 rounded">
                          Unlocked
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-[#1B2A4A] leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#5A607F] font-medium">By {book.author}</p>
                      <p className="text-xs text-[#1A1A2E]/70 line-clamp-2">
                        {book.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#1B2A4A]/10 grid grid-cols-2 gap-2">
                      <Link href={`/books/${book.slug}/read`} className="block w-full">
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<BookOpen className="w-3.5 h-3.5" />}
                          className="w-full text-xs justify-center"
                        >
                          Read Now
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPdf(book)}
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        className="w-full text-xs justify-center"
                      >
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-dashed border-[#1B2A4A]/20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1B2A4A]/5 flex items-center justify-center mx-auto text-[#C9A84C]">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1B2A4A]">
                  No Treatises in Chamber Library Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#5A607F] leading-relaxed">
                  You haven&apos;t purchased any individual legal treatises yet. Browse our comprehensive collection to begin reading.
                </p>
                <Link href="/books">
                  <Button variant="secondary" size="md" className="font-semibold shadow-sm">
                    Browse Legal Treatises
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: DOWNLOADS */}
        {activeTab === 'downloads' && (
          <section className="space-y-6">
            {purchasedBooks.length > 0 ? (
              <div className="bg-white rounded-3xl border border-[#1B2A4A]/10 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#1B2A4A]/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1B2A4A]">
                      Courtroom Offline Downloads
                    </h3>
                    <p className="text-xs text-[#5A607F] mt-0.5">
                      DRM-free authenticated PDF copies with active statutory hyperlinks.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-[#1B2A4A]/10">
                  {purchasedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/5 flex items-center justify-center text-[#C9A84C] shrink-0 mt-1">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-base text-[#1B2A4A]">
                            {book.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-[#5A607F] mt-1">
                            <span>{book.pageCount} Pages</span>
                            <span>•</span>
                            <span>PDF Format</span>
                            <span>•</span>
                            <span className="font-mono">{book.isbn}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPdf(book)}
                        leftIcon={<Download className="w-4 h-4 text-[#1B2A4A]" />}
                        className="shrink-0 text-xs font-semibold"
                      >
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-dashed border-[#1B2A4A]/20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1B2A4A]/5 flex items-center justify-center mx-auto text-[#5A607F]">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1B2A4A]">
                  No Download History
                </h3>
                <p className="text-xs sm:text-sm text-[#5A607F] leading-relaxed">
                  Treatises you purchase or unlock under your Chamber subscription can be downloaded here for offline courtroom sessions.
                </p>
                <Link href="/books">
                  <Button variant="primary" size="md">
                    Explore Books
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: SUBSCRIPTION */}
        {activeTab === 'subscription' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Current Plan Card (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#1B2A4A]/10 shadow-sm space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                      Active Chamber Plan
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-[#1B2A4A] mt-1">
                      {user?.subscription?.plan || 'Pro Chamber Subscription'}
                    </h3>
                    <p className="text-xs text-[#5A607F] mt-1">
                      Full repository access with offline reading & citation exports.
                    </p>
                  </div>
                  <Badge variant="featured" size="md">
                    Active
                  </Badge>
                </div>

                <div className="bg-[#FAFAF8] p-5 rounded-2xl border border-[#1B2A4A]/10 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#5A607F] block">Renewal / Expiry Date:</span>
                    <span className="font-bold text-[#1B2A4A] text-sm mt-0.5 block">
                      {user?.subscription?.expiresAt || 'December 31, 2026'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5A607F] block">Active Chamber Devices:</span>
                    <span className="font-bold text-[#1B2A4A] text-sm mt-0.5 block">
                      2 of 5 Devices in Use
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#1B2A4A]">
                    Included Plan Privileges:
                  </h4>
                  <ul className="text-xs text-[#1A1A2E]/80 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Unlimited reading across all 500+ legal treatises</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>DRM-free high resolution PDF downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Supreme Court bench citations & live headnotes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Priority support from our Delhi chamber editorial desk</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1B2A4A]/10 flex flex-wrap gap-3">
                  <Link href="/pricing">
                    <Button variant="secondary" size="sm" className="font-semibold">
                      Upgrade to Institutional Plan
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Manage GST Invoicing
                  </Button>
                </div>
              </div>

              {/* Chamber Invoicing & Billing Details (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#1B2A4A]/10 shadow-sm space-y-6">
                <h3 className="font-heading font-bold text-xl text-[#1B2A4A]">
                  Chamber Billing Profile
                </h3>

                <div className="space-y-3 text-xs text-[#5A607F]">
                  <div className="flex justify-between py-2 border-b border-[#1B2A4A]/10">
                    <span>Billing Name:</span>
                    <strong className="text-[#1B2A4A]">{user?.name}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#1B2A4A]/10">
                    <span>Email Address:</span>
                    <strong className="text-[#1B2A4A]">{user?.email}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#1B2A4A]/10">
                    <span>Payment Method:</span>
                    <strong className="text-[#1B2A4A]">UPI / Net Banking Auto-Renew</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#1B2A4A]/10">
                    <span>GST Status:</span>
                    <strong className="text-emerald-700">Tax Invoice Registered</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-xs text-[#1B2A4A] space-y-1">
                  <span className="font-bold block">Need Bar Council Group Access?</span>
                  <p className="text-[11px] text-[#1B2A4A]/80 leading-relaxed">
                    Contact our institutional team to configure multi-chamber seats for your state bar association or high court library.
                  </p>
                  <Link
                    href="/contact?subject=institutional"
                    className="inline-block pt-1 font-bold text-[#1B2A4A] hover:underline"
                  >
                    Inquire Institutional Access →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

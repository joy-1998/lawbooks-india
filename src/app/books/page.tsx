import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookMarked } from 'lucide-react';
import { getAllBooks } from '@/lib/books-data';
import { BookGrid } from '@/components/books/BookGrid';

export const metadata: Metadata = {
  title: 'Catalog of Legal Treatises & Commentaries | LexBooks India',
  description:
    'Browse our comprehensive catalog of 500+ Indian legal treatises across Constitutional Law, Criminal Law (BNS/IPC), Civil Procedure, Corporate Law, and Taxation.',
};

export default function BooksPage() {
  const books = getAllBooks();
  const initialSearch = '';
  const initialCategory = 'All';

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#5A607F]">
          <Link href="/" className="hover:text-[#1B2A4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-[#5A607F]/60" />
          <span className="text-[#1B2A4A] font-semibold">Legal Treatises</span>
        </nav>

        {/* Header Section */}
        <div className="border-b border-[#1B2A4A]/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2A4A]/5 text-[#1B2A4A] text-xs font-semibold mb-3">
              <BookMarked className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Complete Scholarly Repository</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1B2A4A] tracking-tight">
              Legal Treatises & Commentaries
            </h1>
            <p className="text-sm sm:text-base text-[#5A607F] mt-2 max-w-2xl leading-relaxed">
              Exhaustive practitioner references, Supreme Court benchmarks, and updated statutory
              commentaries designed for chamber practice and courtroom advocacy.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-[#5A607F] bg-white px-4 py-2 rounded-xl border border-[#1B2A4A]/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Updated with 2024–2025 Criminal Codes</span>
          </div>
        </div>

        {/* Interactive Book Grid Component */}
        <BookGrid
          initialBooks={books}
          initialSearchQuery={initialSearch}
          initialCategory={initialCategory}
        />
      </div>
    </div>
  );
}

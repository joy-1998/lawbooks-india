'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUpDown, SlidersHorizontal, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Book, BookCategory } from '@/lib/books-data';
import { BookCard } from '@/components/books/BookCard';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface BookGridProps {
  initialBooks: Book[];
  initialCategory?: string;
  initialSearchQuery?: string;
}

const CATEGORIES: ('All' | BookCategory)[] = [
  'All',
  'Constitutional Law',
  'Criminal Law',
  'Civil Law',
  'Corporate Law',
  'Tax Law',
  'Family Law',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

export function BookGrid({
  initialBooks,
  initialCategory = 'All',
  initialSearchQuery = '',
}: BookGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  // Sync if prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Simulate subtle loading on filter/sort change for refined feel
  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 200);
  };

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...initialBooks];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (b) => b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q)
      );
    }

    // Sort books
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'newest') return b.publishedYear - a.publishedYear;
      // Default / featured: featured first, then bestseller, then rating
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
      return b.rating - a.rating;
    });

    return result;
  }, [initialBooks, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full space-y-8">
      {/* Search and Sort Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#1B2A4A]/10 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <Input
            placeholder="Search treatises, bare acts, authors, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[#1B2A4A]/50" />}
          />
        </div>

        {/* Sort and Counter */}
        <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-[#5A607F] font-medium hidden sm:inline">
            Showing <strong className="text-[#1B2A4A]">{filteredAndSortedBooks.length}</strong> treatise{filteredAndSortedBooks.length === 1 ? '' : 's'}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#1B2A4A]/60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort legal books"
              className="px-3 py-2 bg-[#FAFAF8] border border-[#1B2A4A]/20 rounded-lg text-xs font-semibold text-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            >
              <option value="featured">Featured First</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="newest">Latest Edition</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]/60 mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                  isSelected
                    ? 'bg-[#1B2A4A] text-white shadow-sm ring-2 ring-[#C9A84C]/50'
                    : 'bg-white text-[#1B2A4A] border border-[#1B2A4A]/15 hover:border-[#C9A84C] hover:bg-white/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Grid State Handling */}
      {isLoading ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 animate-pulse h-96"
            >
              <div className="bg-gray-200 h-48 rounded-xl w-full" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
            </div>
          ))}
        </div>
      ) : filteredAndSortedBooks.length > 0 ? (
        /* Responsive Grid: 1 col mobile, 2 col tablet, 3-4 col desktop */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPreviewClick={(b) => setPreviewBook(b)}
            />
          ))}
        </div>
      ) : (
        /* 'No results' empty state */
        <div className="bg-white rounded-2xl border border-dashed border-[#1B2A4A]/20 p-12 text-center max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#1B2A4A]/5 flex items-center justify-center mx-auto mb-4 text-2xl">
            📚
          </div>
          <h3 className="font-heading font-bold text-xl text-[#1B2A4A] mb-2">
            No Treatises Found
          </h3>
          <p className="text-sm text-[#5A607F] mb-6 leading-relaxed">
            We couldn&apos;t find any commentaries matching your current query &ldquo;
            {searchQuery}&rdquo; in the {selectedCategory} category.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Book Preview Modal */}
      {previewBook && (
        <Modal
          isOpen={!!previewBook}
          onClose={() => setPreviewBook(null)}
          title={previewBook.title}
          description={`By ${previewBook.author} • ${previewBook.category}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="bg-[#1B2A4A]/5 p-4 rounded-xl border border-[#1B2A4A]/10 flex flex-wrap gap-4 justify-between items-center text-xs text-[#1B2A4A]">
              <div>
                <span className="text-[#5A607F]">ISBN:</span>{' '}
                <span className="font-mono font-semibold">{previewBook.isbn}</span>
              </div>
              <div>
                <span className="text-[#5A607F]">Length:</span>{' '}
                <span className="font-semibold">{previewBook.pageCount} Pages</span>
              </div>
              <div>
                <span className="text-[#5A607F]">Year:</span>{' '}
                <span className="font-semibold">{previewBook.publishedYear} Edition</span>
              </div>
              <div>
                <span className="text-[#5A607F]">Price:</span>{' '}
                <span className="font-bold text-[#1B2A4A] text-sm">
                  ₹{previewBook.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-[#1A1A2E]/90 leading-relaxed space-y-3">
              <h4 className="font-heading font-bold text-base text-[#1B2A4A]">
                Comprehensive Synopsis & Scope
              </h4>
              <p className="whitespace-pre-line text-sm text-[#1A1A2E]/80">
                {previewBook.longDescription}
              </p>
            </div>

            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1B2A4A]">
                <BookOpen className="w-4 h-4 text-[#C9A84C]" />
                <span>Sample Table of Contents</span>
              </div>
              <ul className="mt-2 text-xs text-[#1A1A2E]/80 space-y-1.5 list-disc list-inside">
                <li>Chapter 1: Foundational Jurisprudential Framework & Legislative Intent</li>
                <li>Chapter 2: Essential Ingredients, Evidentiary Burden & Pleadings</li>
                <li>Chapter 3: Landmark Supreme Court Precedents & Full Bench Dissents</li>
                <li>Chapter 4: Practical Courtroom Drafts, Caveats, and Petitions</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1B2A4A]/10">
              <Button variant="ghost" size="sm" onClick={() => setPreviewBook(null)}>
                Close Preview
              </Button>
              <Link href={`/books/${previewBook.slug}`}>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  View Full Treatise Details
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BookGrid;

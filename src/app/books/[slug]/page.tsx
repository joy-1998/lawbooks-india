import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Star,
  BookOpen,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  BookMarked,
  Award,
  Calendar,
  FileText,
  Bookmark,
  Share2,
} from 'lucide-react';
import { getAllBooks, getBookBySlug, getBooksByCategory } from '@/lib/books-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookCard } from '@/components/books/BookCard';

interface BookPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const books = getAllBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = getBookBySlug(params.slug);

  if (!book) {
    return {
      title: 'Treatise Not Found | LexBooks India',
    };
  }

  return {
    title: `${book.title} by ${book.author} | LexBooks India`,
    description: book.description,
    keywords: [
      book.title,
      book.author,
      book.category,
      'Supreme Court Commentary',
      'Indian Legal Treatises',
      'Law Books India',
    ],
    openGraph: {
      title: `${book.title} | LexBooks India`,
      description: book.description,
      type: 'book',
      authors: [book.author],
      isbn: book.isbn,
    },
  };
}

export default function BookDetailPage({ params }: BookPageProps) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = getBooksByCategory(book.category)
    .filter((b) => b.id !== book.id)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author,
    },
    isbn: book.isbn,
    numberOfPages: book.pageCount,
    datePublished: String(book.publishedYear),
    description: book.longDescription || book.description,
    genre: book.category,
    publisher: {
      '@type': 'Organization',
      name: 'LexBooks India Publications',
    },
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: book.rating,
      reviewCount: book.reviewCount,
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 sm:py-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#5A607F] flex-wrap gap-1">
          <Link href="/" className="hover:text-[#1B2A4A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-[#5A607F]/60" />
          <Link href="/books" className="hover:text-[#1B2A4A] transition-colors">
            Legal Treatises
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-[#5A607F]/60" />
          <Link
            href={`/books?category=${encodeURIComponent(book.category)}`}
            className="hover:text-[#1B2A4A] transition-colors"
          >
            {book.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-[#5A607F]/60" />
          <span className="text-[#1B2A4A] font-semibold truncate max-w-xs">{book.title}</span>
        </nav>

        {/* Primary Book Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#1B2A4A]/10 shadow-sm">
          {/* Left Column: Large Book Cover Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#1B2A4A] via-[#24375F] to-[#0F1B30]">
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              ) : null}

              {/* High-end fallback / leather cover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#24375F] to-[#0F1B30] p-8 flex flex-col justify-between text-white border-b-8 border-[#C9A84C]">
                <div className="flex items-center justify-between opacity-90 border-b border-white/15 pb-4">
                  <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">
                    Supreme Court Benchmark
                  </span>
                  <BookMarked className="w-6 h-6 text-[#C9A84C]" />
                </div>

                <div className="my-auto py-4">
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl leading-snug text-[#FAFAF8] drop-shadow-md">
                    {book.title}
                  </h2>
                  <div className="w-16 h-1 bg-[#C9A84C] my-4" />
                  <p className="text-sm text-[#C9A84C] font-semibold tracking-wide">
                    {book.author}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-white/70 border-t border-white/15 pt-4">
                  <span>{book.pageCount} Pages • Hardbound</span>
                  <span>{book.publishedYear} Edition</span>
                </div>
              </div>
            </div>

            {/* Badges and Guarantees below cover */}
            <div className="w-full max-w-md mt-6 space-y-3">
              <div className="flex items-center justify-center gap-4 text-xs text-[#5A607F] border-t border-[#1B2A4A]/10 pt-4">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Official Precedent Digest
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C9A84C]" />
                  Bar Council Reference
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Info Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, Bestseller & Featured Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="category" size="md">
                  {book.category}
                </Badge>
                {book.isBestseller && (
                  <Badge variant="bestseller" size="md">
                    Bestseller
                  </Badge>
                )}
                {book.isFeatured && (
                  <Badge variant="featured" size="md">
                    Supreme Court Edition
                  </Badge>
                )}
              </div>

              {/* Title & Author */}
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B2A4A] leading-tight">
                {book.title}
              </h1>
              <p className="text-base text-[#5A607F] font-medium">
                Authored by <span className="text-[#1B2A4A] font-semibold">{book.author}</span>
              </p>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1 bg-[#C9A84C]/15 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-sm text-[#1B2A4A]">{book.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-[#5A607F]">
                  Based on <strong>{book.reviewCount}</strong> verified jurist reviews
                </span>
              </div>

              {/* Pricing Box */}
              <div className="bg-[#FAFAF8] p-5 rounded-2xl border border-[#1B2A4A]/10 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#5A607F] block">
                    Hardbound & Instant Digital Access
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">
                      ₹{book.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#5A607F]">
                      (Incl. of all taxes & free chamber delivery)
                    </span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                  In Stock • Dispatch in 24h
                </div>
              </div>

              {/* Metadata Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs">
                <div className="bg-[#1B2A4A]/5 p-3 rounded-xl border border-[#1B2A4A]/10">
                  <span className="text-[#5A607F] block">Pages:</span>
                  <span className="font-bold text-[#1B2A4A] text-sm mt-0.5 block">
                    {book.pageCount}
                  </span>
                </div>
                <div className="bg-[#1B2A4A]/5 p-3 rounded-xl border border-[#1B2A4A]/10">
                  <span className="text-[#5A607F] block">Edition:</span>
                  <span className="font-bold text-[#1B2A4A] text-sm mt-0.5 block">
                    {book.publishedYear}
                  </span>
                </div>
                <div className="bg-[#1B2A4A]/5 p-3 rounded-xl border border-[#1B2A4A]/10">
                  <span className="text-[#5A607F] block">Format:</span>
                  <span className="font-bold text-[#1B2A4A] text-sm mt-0.5 block">
                    Hardbound + PDF
                  </span>
                </div>
                <div className="bg-[#1B2A4A]/5 p-3 rounded-xl border border-[#1B2A4A]/10">
                  <span className="text-[#5A607F] block">ISBN:</span>
                  <span className="font-mono font-semibold text-[#1B2A4A] text-xs mt-0.5 block truncate">
                    {book.isbn}
                  </span>
                </div>
              </div>

              {/* Long Description */}
              <div className="pt-2 space-y-3">
                <h3 className="font-heading font-bold text-lg text-[#1B2A4A]">
                  Overview & Jurisprudential Scope
                </h3>
                <div className="text-sm text-[#1A1A2E]/80 leading-relaxed whitespace-pre-line space-y-3">
                  {book.longDescription}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 border-t border-[#1B2A4A]/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href={`/books/${book.slug}/read`} className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<BookOpen className="w-5 h-5 text-[#1B2A4A]" />}
                    className="w-full justify-center font-semibold text-sm border-2 border-[#1B2A4A]"
                  >
                    Read Preview (2 Free Pages)
                  </Button>
                </Link>

                <Link href={`/checkout?bookId=${book.id}`} className="block">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<ShoppingBag className="w-5 h-5 text-[#1B2A4A]" />}
                    className="w-full justify-center font-bold text-sm shadow-md"
                  >
                    Buy Now ₹{book.price.toLocaleString('en-IN')}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between text-xs text-[#5A607F] pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Instant digital activation in web reader
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  30-day Chamber replacement warranty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        {relatedBooks.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-end justify-between border-b border-[#1B2A4A]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                  Similar Subject Matter
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B2A4A]">
                  Related Treatises in {book.category}
                </h2>
              </div>
              <Link href={`/books?category=${encodeURIComponent(book.category)}`}>
                <span className="text-xs font-semibold text-[#1B2A4A] hover:text-[#C9A84C] transition-colors">
                  View More in Category →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((related) => (
                <BookCard key={related.id} book={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

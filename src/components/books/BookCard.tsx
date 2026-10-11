'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, BookOpen, ShoppingBag, BookMarked } from 'lucide-react';
import { Book } from '@/lib/books-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface BookCardProps {
  book: Book;
  onPreviewClick?: (book: Book) => void;
  onBuyClick?: (book: Book) => void;
}

export function BookCard({ book, onPreviewClick, onBuyClick }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const handlePreview = (e: React.MouseEvent) => {
    if (onPreviewClick) {
      e.preventDefault();
      onPreviewClick(book);
    }
  };

  const handleBuy = (e: React.MouseEvent) => {
    if (onBuyClick) {
      e.preventDefault();
      onBuyClick(book);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
      {/* Top badges bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {book.isBestseller && (
            <Badge variant="bestseller" size="sm">
              Bestseller
            </Badge>
          )}
          {book.isFeatured && (
            <Badge variant="featured" size="sm">
              Featured
            </Badge>
          )}
        </div>
        <Badge variant="category" size="sm">
          {book.category}
        </Badge>
      </div>

      {/* Book Cover Container */}
      <Link
        href={`/books/${book.slug}`}
        className="relative block w-full pt-[75%] bg-gradient-to-b from-[#1B2A4A]/5 to-[#1B2A4A]/15 overflow-hidden group-hover:opacity-95 transition-opacity"
      >
        {!imageError && book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-end Leather/Gold Legal Book Cover Fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#24375F] to-[#0F1B30] p-6 flex flex-col justify-between text-white border-b-4 border-[#C9A84C]">
            <div className="flex items-center justify-between opacity-80 pt-6">
              <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">
                Supreme Court Edition
              </span>
              <BookMarked className="w-5 h-5 text-[#C9A84C]" />
            </div>

            <div className="my-auto py-2">
              <h4 className="font-heading font-bold text-lg leading-snug line-clamp-3 text-[#FAFAF8] drop-shadow-sm">
                {book.title}
              </h4>
              <p className="text-xs text-[#C9A84C] mt-2 font-medium line-clamp-1">
                {book.author}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/60 border-t border-white/10 pt-2">
              <span>{book.pageCount} Pages</span>
              <span>{book.publishedYear}</span>
            </div>
          </div>
        )}
      </Link>

      {/* Book Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5" title={`${book.rating} out of 5 stars`}>
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-[#1A1A2E]">{book.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#5A607F]">({book.reviewCount})</span>
          </div>
          <span className="text-[11px] text-[#5A607F] font-mono">{book.isbn.slice(-5)}</span>
        </div>

        {/* Title */}
        <Link href={`/books/${book.slug}`} className="focus:outline-none">
          <h3 className="font-heading font-bold text-base text-[#1B2A4A] group-hover:text-[#C9A84C] transition-colors line-clamp-2 leading-snug">
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-xs text-[#5A607F] mt-1 line-clamp-1 font-medium">
          By {book.author}
        </p>

        {/* Description snippet */}
        <p className="text-xs text-[#1A1A2E]/70 mt-2 line-clamp-2 leading-relaxed">
          {book.description}
        </p>

        {/* Price & Actions (pinned to bottom) */}
        <div className="mt-auto pt-4 border-t border-[#1B2A4A]/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-[#5A607F]">Hardbound:</span>
              <span className="text-xl font-bold text-[#1B2A4A] ml-1.5">
                ₹{book.price.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              leftIcon={<BookOpen className="w-3.5 h-3.5" />}
              className="w-full text-xs"
            >
              Preview
            </Button>

            <Link href={`/checkout?bookId=${book.id}`} className="block w-full">
              <Button
                variant="primary"
                size="sm"
                onClick={handleBuy}
                leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

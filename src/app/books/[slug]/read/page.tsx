import React from 'react';
import { Metadata } from 'next';
import { getAllBooks, getBookBySlug } from '@/lib/books-data';
import BookReaderClient from './BookReaderClient';

interface ReaderPageProps {
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

export async function generateMetadata({ params }: ReaderPageProps): Promise<Metadata> {
  const book = getBookBySlug(params.slug);

  if (!book) {
    return {
      title: 'Treatise Not Found | LexBooks India',
    };
  }

  return {
    title: `Read ${book.title} (2-Page Preview) | LexBooks India`,
    description: `Read the authoritative Supreme Court commentary '${book.title}' by ${book.author}. Free 2-page preview with instant digital or PDF download access.`,
  };
}

export default function BookReaderPage({ params }: ReaderPageProps) {
  return <BookReaderClient slug={params.slug} />;
}

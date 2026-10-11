import { NextRequest, NextResponse } from 'next/server';
import { books, searchBooks, getBooksByCategory } from '@/lib/books-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const featuredParam = searchParams.get('featured');
    const bestsellerParam = searchParams.get('bestseller');

    let result = [...books];

    // Filter by category if specified
    if (categoryParam && categoryParam.trim() !== '') {
      result = getBooksByCategory(categoryParam.trim());
    }

    // Filter by search query if specified
    if (searchParam && searchParam.trim() !== '') {
      const q = searchParam.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q)
      );
    }

    // Optional flags
    if (featuredParam === 'true') {
      result = result.filter((b) => b.isFeatured);
    }

    if (bestsellerParam === 'true') {
      result = result.filter((b) => b.isBestseller);
    }

    return NextResponse.json(
      {
        success: true,
        count: result.length,
        data: result,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching books in /api/books:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch legal book catalog',
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

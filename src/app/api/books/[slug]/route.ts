import { NextRequest, NextResponse } from 'next/server';
import { getBookBySlug } from '@/lib/books-data';

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const slug = context.params?.slug;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book slug parameter is required',
        },
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const book = getBookBySlug(slug);

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: `Book with slug '${slug}' not found`,
        },
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: book,
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
    console.error('Error fetching book by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while retrieving book',
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

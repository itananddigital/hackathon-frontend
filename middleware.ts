import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const apiKey = request.cookies.get('api_key')?.value;
  const full_name = request.cookies.get('full_name')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = token && apiKey && full_name !== "Guest";

  if (isAuthenticated) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
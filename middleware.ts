import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const publicRoutes = ['/', '/login', '/register'];
const excludedRoutes = [
  '/api',
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    excludedRoutes.some((route) => pathname.startsWith(route)) ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const apiKey = request.cookies.get('api_key')?.value;
  const full_name = request.cookies.get('full_name')?.value;

  const isAuthenticated = token && apiKey && full_name !== 'Guest';

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
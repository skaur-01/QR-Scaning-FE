import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/qr'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Normalize path (remove trailing slashes)
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  // If request is for a public path (exact or starts with public), allow it
  const isPublic = PUBLIC_PATHS.some(
    (path) =>
      normalizedPath === path || normalizedPath.startsWith(`${path}/`)
  );

  if (isPublic) {
    return NextResponse.next(); // allow public routes always
  }

  // If not authenticated, redirect to login — but prevent infinite loop
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // allow authenticated access
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
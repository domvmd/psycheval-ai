import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/sessions', '/recordings', '/profile'];

// Define auth routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth/login', '/auth/signup'];

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has auth token
  const authToken = request.cookies.get('sb-auth-token');
  const isAuthenticated = !!authToken;

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl, { status: 307 });
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const redirectUrl = new URL(redirectParam || '/dashboard', request.url);
    return NextResponse.redirect(redirectUrl, { status: 307 });
  }

  return NextResponse.next();
}
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/auth';
import type { NextRequest } from 'next/server';

// Mock NextRequest
const createMockRequest = (pathname: string, cookies?: Record<string, string>) => {
  const url = new URL(pathname, 'http://localhost:3000');
  const mockRequest = {
    url: url.toString(),
    nextUrl: url,
    cookies: {
      get: (name: string) => cookies?.[name] ? { value: cookies[name] } : undefined,
    },
  } as unknown as NextRequest;
  return mockRequest;
};

describe('Auth Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Protected Routes', () => {
    it('should redirect unauthenticated users to login', async () => {
      const request = createMockRequest('/dashboard');
      const response = await authMiddleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('/auth/login?redirect=/dashboard');
    });

    it('should allow authenticated users to access protected routes', async () => {
      const request = createMockRequest('/dashboard', {
        'sb-auth-token': 'valid-token',
      });
      const response = await authMiddleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(200);
    });

    it('should handle multiple protected route patterns', async () => {
      const protectedRoutes = ['/dashboard', '/sessions', '/recordings', '/profile'];
      
      for (const route of protectedRoutes) {
        const request = createMockRequest(route);
        const response = await authMiddleware(request);
        
        expect(response.status).toBe(307);
        expect(response.headers.get('location')).toContain('/auth/login');
      }
    });
  });

  describe('Public Routes', () => {
    it('should allow access to auth routes without authentication', async () => {
      const authRoutes = ['/auth/login', '/auth/signup', '/auth/reset-password'];
      
      for (const route of authRoutes) {
        const request = createMockRequest(route);
        const response = await authMiddleware(request);
        
        expect(response.status).toBe(200);
      }
    });

    it('should redirect authenticated users away from auth pages', async () => {
      const request = createMockRequest('/auth/login', {
        'sb-auth-token': 'valid-token',
      });
      const response = await authMiddleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('/dashboard');
    });

    it('should allow access to public routes', async () => {
      const publicRoutes = ['/', '/about', '/pricing'];
      
      for (const route of publicRoutes) {
        const request = createMockRequest(route);
        const response = await authMiddleware(request);
        
        expect(response.status).toBe(200);
      }
    });
  });

  describe('Redirect Handling', () => {
    it('should preserve redirect parameter after login', async () => {
      const request = createMockRequest('/sessions/123');
      const response = await authMiddleware(request);

      expect(response.headers.get('location')).toBe('/auth/login?redirect=/sessions/123');
    });

    it('should handle redirect parameter in auth pages', async () => {
      const request = createMockRequest('/auth/login?redirect=/profile', {
        'sb-auth-token': 'valid-token',
      });
      const response = await authMiddleware(request);

      expect(response.headers.get('location')).toBe('/profile');
    });

    it('should default to dashboard when no redirect specified', async () => {
      const request = createMockRequest('/auth/login', {
        'sb-auth-token': 'valid-token',
      });
      const response = await authMiddleware(request);

      expect(response.headers.get('location')).toBe('/dashboard');
    });
  });
});
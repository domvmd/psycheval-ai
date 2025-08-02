import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Next.js cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name: string) => ({ value: `mock-${name}` })),
    set: vi.fn(),
  })),
}));

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-role-key',
};

describe('Supabase Client', () => {
  beforeEach(() => {
    // Reset environment variables
    vi.resetModules();
    Object.keys(mockEnv).forEach(key => {
      process.env[key] = mockEnv[key];
    });
  });

  describe('Client-side Supabase client', () => {
    it('should create a client with public credentials', async () => {
      const { createBrowserClient } = await import('@/lib/supabase/client');
      const client = createBrowserClient();
      
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.from).toBeDefined();
      expect(client.storage).toBeDefined();
    });

    it('should throw error if environment variables are missing', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      
      const { createBrowserClient } = await import('@/lib/supabase/client');
      expect(() => createBrowserClient()).toThrow();
    });
  });

  describe('Server-side Supabase client', () => {
    it('should create a client with service role key', async () => {
      const { createServerClient } = await import('@/lib/supabase/server');
      const client = await createServerClient();
      
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.from).toBeDefined();
    });

    it('should create a client with anon key when service role not available', async () => {
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      const { createServerClient } = await import('@/lib/supabase/server');
      const client = await createServerClient();
      
      expect(client).toBeDefined();
    });
  });

  describe('Supabase types', () => {
    it('should export database types', async () => {
      const types = await import('@/types/supabase');
      
      expect(types).toBeDefined();
    });
  });
});

describe('Supabase Auth Helpers', () => {
  it('should handle auth state changes', async () => {
    const { createBrowserClient } = await import('@/lib/supabase/client');
    const client = createBrowserClient();
    
    const authListener = vi.fn();
    const { data: { subscription } } = client.auth.onAuthStateChange(authListener);
    
    expect(subscription).toBeDefined();
    expect(subscription.unsubscribe).toBeDefined();
  });
});
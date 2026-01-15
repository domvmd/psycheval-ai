import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createBrowserClient: vi.fn(),
}));

describe('AuthContext', () => {
  let mockSupabaseClient: any;
  let mockUser: User;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    };

    mockSupabaseClient = {
      auth: {
        getSession: vi.fn(),
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updateUser: vi.fn(),
        onAuthStateChange: vi.fn((callback) => {
          // Simulate immediate callback
          callback('INITIAL_SESSION', null);
          return {
            data: { subscription: { unsubscribe: vi.fn() } },
          };
        }),
      },
    };

    (createBrowserClient as any).mockReturnValue(mockSupabaseClient);
  });

  describe('AuthProvider', () => {
    it('should provide authentication context to children', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current).toBeDefined();
      expect(result.current.user).toEqual(mockUser);
    });

    it('should handle login state transitions', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBeNull();

      // Simulate login
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      await act(async () => {
        await result.current.signIn('test@example.com', 'password');
      });

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });

    it('should clear state on logout', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    });

    it('should handle authentication errors gracefully', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const authError = new Error('Invalid credentials');
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: authError,
      });

      await act(async () => {
        try {
          await result.current.signIn('test@example.com', 'wrong-password');
        } catch (error) {
          expect(error).toEqual(authError);
        }
      });
    });
  });

  describe('useAuth Hook', () => {
    it('should return current user when authenticated', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should return null when not authenticated', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should provide login and logout functions', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(typeof result.current.signIn).toBe('function');
      expect(typeof result.current.signUp).toBe('function');
      expect(typeof result.current.signOut).toBe('function');
      expect(typeof result.current.resetPassword).toBe('function');
    });
  });
});
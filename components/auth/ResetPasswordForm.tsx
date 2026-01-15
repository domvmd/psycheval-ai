'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';

export function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setError(null);
    
    try {
      const { error } = await resetPassword(data.email);
      
      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  if (success) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <h3 className="text-sm font-medium text-green-800">
          Check your email
        </h3>
        <p className="mt-2 text-sm text-green-700">
          We've sent you a password reset link. Please check your email and follow the instructions.
        </p>
        <div className="mt-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
      </button>

      <div className="text-center">
        <Link href="/auth/login" className="text-sm text-indigo-600 hover:text-indigo-500">
          Back to login
        </Link>
      </div>
    </form>
  );
}
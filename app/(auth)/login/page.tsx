'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { AuthBackground } from '@/components/auth-background';

import { login, type LoginActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'failed') {
      toast.error('Invalid credentials!');
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!');
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center">
      <AuthBackground />
      
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-zinc-900/70 backdrop-blur-md border border-zinc-800 p-8 shadow-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Replace key icon with OYUNA heading at the top */}
          <div className="text-center oyuna-container mt-2">
            <h2 className="text-4xl font-bold">
              <span className="oyuna-text">OYUNA</span>
            </h2>
            <p className="welcome-text mt-4">Welcome back</p>
            <p className="text-sm text-zinc-400/90 mt-2">
              Use your email and password to sign in
            </p>
          </div>

          {/* Social login buttons and the rest remain the same */}
          <div className="w-full space-y-3">
            <button 
              disabled
              className="relative w-full flex items-center justify-center gap-3 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed transition hover:bg-white/5"
            >
              <svg className="size-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.075C15.0054 18.785 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              Login with Google
              <span className="absolute right-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">Coming Soon</span>
            </button>

            <button 
              disabled
              className="relative w-full flex items-center justify-center gap-3 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed transition hover:bg-white/5"
            >
              <svg className="size-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
              </svg>
              Login with GitHub
              <span className="absolute right-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">Coming Soon</span>
            </button>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900/80 px-2 text-zinc-400">or continue with</span>
            </div>
          </div>

          <AuthForm action={handleSubmit} defaultEmail={email}>
            <SubmitButton isSuccessful={isSuccessful}>
              {state.status === 'in_progress' ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </SubmitButton>
            <p className="text-center text-sm text-zinc-400 mt-4">
              {"Don't have an account? "}
              <Link href="/register" className="text-white font-medium hover:underline">
                Sign up
              </Link>
              {' for free.'}
            </p>
          </AuthForm>
        </div>
      </div>
    </div>
  );
}

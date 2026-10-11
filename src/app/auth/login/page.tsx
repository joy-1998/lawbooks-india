'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Scale, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[#C9A84C] border-t-transparent rounded-full" /></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!email.trim()) {
      setAlert({ type: 'error', message: 'Please enter your chamber or registered email address.' });
      return;
    }

    if (!password.trim()) {
      setAlert({ type: 'error', message: 'Please enter your password.' });
      return;
    }

    setIsLoading(true);
    try {
      await login(email.trim(), password);
      setAlert({
        type: 'success',
        message: 'Authentication successful! Redirecting to your chamber dashboard...',
      });
      setTimeout(() => {
        router.push(redirectPath);
      }, 700);
    } catch {
      setAlert({
        type: 'error',
        message: 'Authentication failed. Please verify credentials.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#1B2A4A]/10 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B2A4A] text-[#C9A84C] flex items-center justify-center mx-auto shadow-md">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B2A4A]">
            Advocate Sign In
          </h1>
          <p className="text-xs sm:text-sm text-[#5A607F]">
            Access your treatises, annotations, and offline downloads.
          </p>
        </div>

        {/* Alert Notifications */}
        {alert && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-2.5 transition-all animate-in fade-in ${
              alert.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {alert.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Bar Council / Official Email"
            type="email"
            placeholder="advocate@supremecourt.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#1A1A2E]/80">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#1B2A4A] focus:ring-[#C9A84C] border-gray-300"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-[#1B2A4A] font-semibold hover:text-[#C9A84C] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center font-bold text-sm shadow-md mt-2"
          >
            Sign In to Chambers
          </Button>
        </form>

        {/* Demo Quick Fill Hint */}
        <div className="bg-[#1B2A4A]/5 p-3 rounded-xl border border-[#1B2A4A]/10 text-center">
          <p className="text-[11px] text-[#5A607F]">
            Demo access: Click below to autofill verified advocate credentials
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail('rksharma@supremecourt.in');
              setPassword('lexbooks2024');
            }}
            className="mt-1 text-xs font-bold text-[#1B2A4A] hover:text-[#C9A84C] underline"
          >
            Autofill Demo Account
          </button>
        </div>

        {/* Register Footer */}
        <div className="pt-4 border-t border-[#1B2A4A]/10 text-center text-xs text-[#5A607F]">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/auth/register"
            className="font-bold text-[#1B2A4A] hover:text-[#C9A84C] transition-colors underline"
          >
            Register Chamber Account
          </Link>
        </div>
      </div>
    </div>
  );
}

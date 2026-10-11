'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Scale, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!name.trim()) {
      setAlert({ type: 'error', message: 'Please enter your full name or chamber title.' });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setAlert({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match. Please re-enter.' });
      return;
    }

    if (!termsAccepted) {
      setAlert({ type: 'error', message: 'You must agree to the Terms of Service & Privacy Policy.' });
      return;
    }

    setIsLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      setAlert({
        type: 'success',
        message: 'Registration successful! Preparing your chamber dashboard...',
      });
      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } catch {
      setAlert({
        type: 'error',
        message: 'Registration failed. Please try again.',
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
            Create Chamber Account
          </h1>
          <p className="text-xs sm:text-sm text-[#5A607F]">
            Join 50,000+ advocates and researchers on LexBooks India.
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name & Designation *"
            type="text"
            placeholder="e.g. Adv. Priya Deshmukh"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Bar Council / Official Email *"
            type="email"
            placeholder="counsel@barcouncil.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Create Password *"
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Input
            label="Confirm Password *"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#1A1A2E]/80">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#1B2A4A] focus:ring-[#C9A84C] border-gray-300"
              />
              <span className="leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="font-semibold text-[#1B2A4A] underline hover:text-[#C9A84C]">
                  Terms of Service
                </Link>{' '}
                and confirm my adherence to Bar Council digital research standards.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center font-bold text-sm shadow-md mt-2"
          >
            Create My Account
          </Button>
        </form>

        {/* Login Footer */}
        <div className="pt-4 border-t border-[#1B2A4A]/10 text-center text-xs text-[#5A607F]">
          <span>Already have an account? </span>
          <Link
            href="/auth/login"
            className="font-bold text-[#1B2A4A] hover:text-[#C9A84C] transition-colors underline"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

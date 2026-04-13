'use client';

import { useState } from 'react';
import { HexBackground } from '@/components/ui/hex-background';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError('Failed to send reset email. Please try again.');
      } else {
        setSuccess('Password reset email sent! Please check your inbox.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full min-h-full"
        />
      </div>
      
      {/* Main content - elevated above background */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none" style={{ color: 'var(--dark-charcoal)' }}>
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-8 py-12 pointer-events-none">
          <div className="w-full max-w-md">
            <div 
              className="rounded-2xl p-8 shadow-lg pointer-events-auto"
              style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--light-gray)' }}
            >
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <img
                    src="/HelpHiveLogo.png"
                    alt="HelpHive Logo"
                    className="h-32 w-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                  Forgot Password
                </h2>
                <p style={{ color: 'var(--mid-gray)' }}>
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {isLoading ? 'Sending Email...' : 'Submit Email'}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                    style={{ 
                      backgroundColor: 'white',
                      color: 'var(--dark-charcoal)',
                      border: '1px solid var(--mid-gray)'
                    }}
                  >
                    Return to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

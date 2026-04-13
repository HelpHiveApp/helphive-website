'use client';

import { useState, useEffect, Suspense } from 'react';
import { HexBackground } from '@/components/ui/hex-background';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user has valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new password reset.');
      }
    };
    
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setError('Failed to reset password. Please try again.');
        console.error('Password reset error:', error);
      } else {
        setSuccess('Password successfully reset! Redirecting to login...');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', error);
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
                  Reset Password
                </h2>
                <p style={{ color: 'var(--mid-gray)' }}>
                  Enter your new password below
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
                    htmlFor="newPassword" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !!success}
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  {isLoading ? 'Resetting Password...' : success ? 'Redirecting...' : 'Reset Password'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <a 
                  href="/login" 
                  className="text-sm hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="relative w-full">
        <div className="absolute inset-0 z-0 h-full w-full">
          <HexBackground
            hexagonSize={75}
            hexagonMargin={4}
            className="w-full min-h-full"
          />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center" style={{ color: 'var(--dark-charcoal)' }}>
            Loading...
          </div>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

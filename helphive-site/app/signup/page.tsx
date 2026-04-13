'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HexBackground } from '@/components/ui/hex-background';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (!agreeToTerms) {
      setError('Please agree to the Terms and Privacy Policy!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          displayName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        return;
      }

      // Redirect to check-email page instead of auto-signing in
      router.push(`/auth/check-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError('Failed to sign up with Google. Please try again.');
      }
    } catch (error) {
      setError('An error occurred with Google sign-up.');
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
                Join the Hive
              </h2>
              <p style={{ color: 'var(--mid-gray)' }}>
                Create your HelpHive account
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="displayName" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  required
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="Choose a display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

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

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Confirm Password
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
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  required
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm" style={{ color: 'var(--mid-gray)' }}>
                  I agree to the{' '}
                  <a 
                    href="/legal/terms" 
                    className="hover:underline pointer-events-auto"
                    style={{ color: 'var(--primary)' }}
                  >
                    Terms
                  </a>
                  {' and '}
                  <a 
                    href="/legal/privacy" 
                    className="hover:underline pointer-events-auto"
                    style={{ color: 'var(--primary)' }}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--mid-gray)' }}></div>
              <span className="px-4 text-sm" style={{ color: 'var(--mid-gray)' }}>OR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--mid-gray)' }}></div>
            </div>

            {/* Google Sign-Up Button */}
            <button
              onClick={signUpWithGoogle}
              type="button"
              className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-md flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: 'white',
                color: 'var(--dark-charcoal)',
                border: '1px solid var(--mid-gray)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
                <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
                <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40665 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54756 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
                <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="mt-8 text-center">
              <p style={{ color: 'var(--mid-gray)' }}>
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="font-medium hover:underline pointer-events-auto"
                  style={{ color: 'var(--primary)' }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      </div>
    </div>
  );
}

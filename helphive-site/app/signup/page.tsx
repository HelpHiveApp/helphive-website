'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { HexBackground } from '@/components/ui/hex-background';
import Header from '../components/Header';

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

      setSuccess('Account created successfully! Signing you in...');
      
      // Automatically sign in the user after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but failed to sign in. Please try logging in manually.');
      } else {
        // Redirect to available jobs page on successful login
        router.push('/availablejobs');
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
      <Header />

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

      {/* Footer */}
      <footer className="w-full py-4 text-center pointer-events-none">
        <p className="text-xs" style={{ color: 'var(--mid-gray)' }}>
          <a href="/legal/terms" className="hover:underline pointer-events-auto" style={{ color: 'var(--mid-gray)' }}>Terms</a>
          {' & '}
          <a href="/legal/privacy" className="hover:underline pointer-events-auto" style={{ color: 'var(--mid-gray)' }}>Privacy</a>
        </p>
      </footer>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { HexBackground } from '@/components/ui/hex-background';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
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
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-80 py-2 border-b pointer-events-none" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
        <h1 className="text-lg font-bold font-ubuntu" style={{ color: 'var(--primary)' }}>
          <a href="/" className="pointer-events-auto">HelpHive</a>
        </h1>
        <nav className="flex space-x-3">
          <a
            href="/help"
            className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
          >
            Help
          </a>
          <a
            href="/login"
            className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
          >
            Sign up
          </a>
        </nav>
      </header>

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
                Welcome Back
              </h2>
              <p style={{ color: 'var(--mid-gray)' }}>
                Sign in to your HelpHive account
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                {error}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm" style={{ color: 'var(--mid-gray)' }}>
                    Remember me
                  </span>
                </label>
                <a 
                  href="#" 
                  className="text-sm hover:underline pointer-events-auto"
                  style={{ color: 'var(--primary)' }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p style={{ color: 'var(--mid-gray)' }}>
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  className="font-medium hover:underline pointer-events-auto"
                  style={{ color: 'var(--primary)' }}
                >
                  Sign up
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

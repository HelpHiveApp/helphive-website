'use client';

import { HexBackground } from '@/components/ui/hex-background';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your inbox';

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
              <div className="text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/HelpHiveLogo.png"
                    alt="HelpHive Logo"
                    className="h-32 w-auto"
                  />
                </div>

                {/* Email Icon */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <svg 
                      className="w-10 h-10" 
                      style={{ color: 'var(--dark-charcoal)' }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                  Check Your Email
                </h2>

                {/* Message */}
                <div className="space-y-4 mb-8">
                  <p className="text-lg" style={{ color: 'var(--mid-gray)' }}>
                    Please check your inbox for the confirmation email.
                  </p>
                  
                  <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
                    We've sent a verification link to{' '}
                    <span className="font-semibold" style={{ color: 'var(--dark-charcoal)' }}>
                      {email}
                    </span>
                  </p>

                  <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
                    Click the link in the email to verify your account and complete your registration.
                  </p>
                </div>

                {/* Additional info */}
                <div 
                  className="rounded-lg p-4 mb-6"
                  style={{ backgroundColor: 'var(--light-gray)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--mid-gray)' }}>
                    <strong style={{ color: 'var(--dark-charcoal)' }}>Didn't receive the email?</strong>
                    <br />
                    Check your spam folder or wait a few minutes and try again.
                  </p>
                </div>

                {/* Back to login */}
                <div className="text-center">
                  <a 
                    href="/login" 
                    className="inline-block px-6 py-3 rounded-xl font-medium transition-opacity duration-200 hover:opacity-90"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      color: 'var(--dark-charcoal)'
                    }}
                  >
                    Go to Login
                  </a>
                </div>

                <div className="mt-6 text-center">
                  <a 
                    href="/" 
                    className="text-sm hover:underline"
                    style={{ color: 'var(--primary)' }}
                  >
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CheckEmail() {
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
      <CheckEmailContent />
    </Suspense>
  );
}

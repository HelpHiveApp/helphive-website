'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HexBackground } from '@/components/ui/hex-background';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full min-h-full"
        />
      </div>
      
      {/* Main content - elevated above background */}
      <div className="relative z-10 min-h-screen flex flex-col" style={{ color: 'var(--dark-charcoal)' }}>
        {/* <Header /> */}

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-8 py-12 pointer-events-none">
          <div className="w-full max-w-md">
            <div 
              className="rounded-2xl p-8 shadow-lg pointer-events-auto"
              style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--light-gray)' }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src="/HelpHiveLogo.png"
                    alt="HelpHive Logo"
                    className="h-32 w-auto"
                  />
                </div>
                
                {/* Email Icon */}
                <div className="mb-6 flex justify-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <svg 
                      className="w-10 h-10" 
                      fill="none" 
                      stroke="var(--dark-charcoal)" 
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                  Your email has been verified!
                </h2>
                
                <p className="mb-6 text-base" style={{ color: 'var(--mid-gray)' }}>
                  You can now log back into the app.
                </p>
                
                {email && (
                  <p className="mb-6 text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                    {email}
                  </p>
                )}
                
                {/* <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--mid-gray)' }}>
                  Please check your inbox and click the verification link to activate your account. 
                  If you don't see the email, check your spam folder.
                </p> */}

                <div className="space-y-4">
                  <a
                    href="/login"
                    className="block w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 pointer-events-auto text-center"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    Go to Login
                  </a>

                  {/* <button
                    onClick={() => window.location.reload()}
                    className="block w-full py-3 px-6 rounded-xl font-medium transition-opacity duration-200 hover:opacity-90 pointer-events-auto text-center"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: '1px solid var(--mid-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                  >
                    Resend Verification Email
                  </button> */}
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--light-gray)' }}>
                  <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
                    Need help?{' '}
                    <a 
                      href="/help" 
                      className="font-medium hover:underline pointer-events-auto"
                      style={{ color: 'var(--primary)' }}
                    >
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </div>
  );
}

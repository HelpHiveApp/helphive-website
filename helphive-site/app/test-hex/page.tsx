'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { HexBackground } from '@/components/ui/hex-background';

export default function TestHexPage() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return (
    <div className="relative w-full min-h-screen">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 h-full w-full" style={{ outline: '1px solid red' }}>
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full min-h-full"
        />
      </div>
      
      {/* Content with homepage header */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none" style={{ color: 'var(--dark-charcoal)' }}>
        {/* Top bar - copied from homepage */}
        <header className="w-full flex items-center justify-between px-80 py-2 border-b pointer-events-auto" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
          <h1 className="text-lg font-bold font-ubuntu" style={{ color: 'var(--primary)' }}>HelpHive</h1>
          <nav className="flex space-x-3">
            <a
              href="/help"
              className="nav-button text-xs px-2 py-1 rounded"
            >
              Help
            </a>
            {session ? (
              <button
                onClick={handleLogout}
                className="nav-button text-xs px-2 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <a
                  href="/login"
                  className="nav-button text-xs px-2 py-1 rounded"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="nav-button text-xs px-2 py-1 rounded"
                >
                  Sign up
                </a>
              </>
            )}
          </nav>
        </header>

        {/* Main content area */}
        <main>
          {/* First section - Post a job (empty for testing) */}
          <section className="flex flex-col lg:flex-row items-center justify-center px-8 lg:px-16 py-20 gap-8 lg:gap-16 min-h-screen border-b-2 pointer-events-none" style={{ borderColor: 'var(--light-gray)' }}>
            <div className="w-full text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
                Section 1 - Empty for Testing
              </h2>
              <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                This section is mostly empty to test hexagon hover effects.
              </p>
            </div>
          </section>

          {/* Second section - Find work (empty for testing) */}
          <section className="flex flex-col lg:flex-row flex-1 items-center justify-center px-8 lg:px-16 py-20 gap-8 lg:gap-16 min-h-screen pointer-events-auto">
            <div className="w-full text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
                Section 2 - Empty for Testing
              </h2>
              <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                This section is also mostly empty to test hexagon hover effects.
              </p>
              
              {/* Test button */}
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => alert('Button clicked!')}
              >
                Test Button
              </button>
            </div>
          </section>
        </main>

        {/* Test instructions */}
        <div className="p-8 text-sm text-gray-500 border-t">
          <p>• Red outline shows the background container</p>
          <p>• Hover over empty areas between sections to see hexagon effects</p>
          <p>• Both sections have pointer-events-auto</p>
          <p>• Try hovering in margins and empty spaces</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export default function Header({ showAuthButtons = true }: HeaderProps) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-80 py-1 border-b pointer-events-none" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
      <div className="flex items-center space-x-2">
        <a href="/" className="pointer-events-auto flex items-center space-x-2">
          <img
            src="/HelpHiveLogo.png"
            alt="HelpHive Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-lg font-bold font-ubuntu" style={{ color: 'var(--primary)' }}>
            HelpHive
          </h1>
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-3">
        {/* Logged-in user navigation buttons */}
        {session && (
          <>
            <a
              href="/postjob"
              className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
            >
              Post a Job
            </a>
            <a
              href="/availablejobs"
              className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
            >
              View Jobs
            </a>
            {/* Separator */}
            <div className="w-px h-4 mx-2" style={{ backgroundColor: 'var(--mid-gray)' }}></div>
          </>
        )}
        
        <a
          href="/help"
          className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
        >
          Help
        </a>
        {showAuthButtons && (
          <>
            {session ? (
              <button
                onClick={handleLogout}
                className="nav-button text-xs px-2 py-1 rounded pointer-events-auto"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded pointer-events-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: 'var(--accent)' }}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`block w-5 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
          style={{ backgroundColor: 'var(--dark-charcoal)' }}
        ></span>
        <span
          className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
          style={{ backgroundColor: 'var(--dark-charcoal)' }}
        ></span>
        <span
          className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
          style={{ backgroundColor: 'var(--dark-charcoal)' }}
        ></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden pointer-events-auto">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={closeMobileMenu}
          ></div>
          
          {/* Menu Panel */}
          <div
            className="absolute top-0 right-0 h-full w-64 shadow-lg transform transition-transform duration-300"
            style={{ backgroundColor: 'var(--dark-charcoal)' }}
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center rounded"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <span className="text-lg font-bold" style={{ color: 'var(--dark-charcoal)' }}>×</span>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-4 px-6">
              {/* Logged-in user navigation buttons */}
              {session && (
                <>
                  <a
                    href="/postjob"
                    className="text-sm py-2 px-3 rounded transition-colors duration-200"
                    style={{ color: 'var(--off-white)' }}
                    onClick={closeMobileMenu}
                  >
                    Post a Job
                  </a>
                  <a
                    href="/availablejobs"
                    className="text-sm py-2 px-3 rounded transition-colors duration-200"
                    style={{ color: 'var(--off-white)' }}
                    onClick={closeMobileMenu}
                  >
                    View Jobs
                  </a>
                  {/* Separator line */}
                  <div className="h-px mx-3 my-2" style={{ backgroundColor: 'var(--mid-gray)' }}></div>
                </>
              )}
              
              <a
                href="/help"
                className="text-sm py-2 px-3 rounded transition-colors duration-200"
                style={{ color: 'var(--off-white)' }}
                onClick={closeMobileMenu}
              >
                Help
              </a>
              {showAuthButtons && (
                <>
                  {session ? (
                    <button
                      onClick={handleLogout}
                      className="text-sm py-2 px-3 rounded text-left transition-colors duration-200"
                      style={{ color: 'var(--off-white)' }}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="text-sm py-2 px-3 rounded transition-colors duration-200"
                        style={{ color: 'var(--off-white)' }}
                        onClick={closeMobileMenu}
                      >
                        Log in
                      </a>
                      <a
                        href="/signup"
                        className="text-sm py-2 px-3 rounded transition-colors duration-200"
                        style={{ color: 'var(--off-white)' }}
                        onClick={closeMobileMenu}
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

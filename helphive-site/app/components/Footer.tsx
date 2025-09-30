'use client';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-80 py-6 pointer-events-none" style={{ backgroundColor: 'var(--dark-charcoal)' }}>
      {/* Grey bar above the links */}
      <div className="w-full max-w-53 h-px mb-4" style={{ backgroundColor: 'var(--mid-gray)' }}></div>
      
      {/* Terms & Privacy links */}
      <div className="text-center pointer-events-auto">
        <p className="text-xs" style={{ color: 'var(--mid-gray)' }}>
          <a href="/legal/terms" className="hover:underline transition-colors duration-200" style={{ color: 'var(--mid-gray)' }}>
            Terms
          </a>
          {' & '}
          <a href="/legal/privacy" className="hover:underline transition-colors duration-200" style={{ color: 'var(--mid-gray)' }}>
            Privacy
          </a>
        </p>
      </div>
    </footer>
  );
}

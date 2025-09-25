// /app/legal/terms/page.tsx
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--off-white)', color: 'var(--dark-charcoal)' }}>
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-80 py-2 border-b" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
        <h1 className="text-lg font-bold font-ubuntu" style={{ color: 'var(--primary)' }}>
          <a href="/">HelpHive</a>
        </h1>
        <nav className="flex space-x-3">
          <a
            href="/help"
            className="nav-button text-xs px-2 py-1 rounded"
          >
            Help
          </a>
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
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto px-8 py-12" style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>HelpHive Terms & Conditions</h1>
        <p className="mb-8" style={{ color: 'var(--mid-gray)' }}><em>Last updated: September 2025</em></p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>1. Acceptance of Terms</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>By using HelpHive, you agree to these Terms & Conditions. If you do not agree, you may not use the platform.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>2. Description of Service</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>HelpHive is a platform that connects people posting short-term jobs with workers looking for opportunities. HelpHive itself does not provide or perform jobs.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>3. User Responsibilities</h2>
        <ul className="mb-6 ml-6" style={{ color: 'var(--dark-charcoal)' }}>
          <li className="mb-2">You must provide accurate information when registering.</li>
          <li className="mb-2">You are responsible for your own conduct and communications on the platform.</li>
          <li className="mb-2">You agree not to misuse the app for illegal or harmful purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>4. Job Postings and Applications</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>Job posters are solely responsible for the accuracy of job details. Workers are solely responsible for the quality of the work they perform. HelpHive is not liable for any disputes between users.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>5. Payments</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>At this time, payments are handled directly between users. HelpHive may introduce secure payment features in the future and update these Terms accordingly.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>6. Limitation of Liability</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>HelpHive provides the platform "as is." We are not liable for damages, losses, or disputes arising from jobs, communication, or agreements made between users.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>7. Changes to Terms</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>We may update these Terms from time to time. Continued use of the app after updates means you accept the new Terms.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>8. Contact</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>If you have questions, contact us at: <a href="mailto:support@helphive.app" style={{ color: 'var(--slate-blue)' }} className="hover:underline">support@helphive.app</a></p>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center">
        <p className="text-xs" style={{ color: 'var(--mid-gray)' }}>
          <a href="/legal/terms" className="hover:underline" style={{ color: 'var(--mid-gray)' }}>Terms</a>
          {' & '}
          <a href="/legal/privacy" className="hover:underline" style={{ color: 'var(--mid-gray)' }}>Privacy</a>
        </p>
      </footer>
    </div>
  );
}

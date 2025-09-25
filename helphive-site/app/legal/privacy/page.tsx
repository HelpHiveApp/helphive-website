// /app/legal/privacy/page.tsx
import React from "react";
import Header from "../../components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--off-white)', color: 'var(--dark-charcoal)' }}>
      <Header />

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto px-8 py-12" style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>HelpHive Privacy Policy</h1>
        <p className="mb-8" style={{ color: 'var(--mid-gray)' }}><em>Last updated: September 2025</em></p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>1. Introduction</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>This Privacy Policy explains how HelpHive collects, uses, and protects your information when you use our platform.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>2. Information We Collect</h2>
        <ul className="mb-6 ml-6" style={{ color: 'var(--dark-charcoal)' }}>
          <li className="mb-2"><strong>Account Information:</strong> such as your name, email address, and profile details.</li>
          <li className="mb-2"><strong>Job Information:</strong> including job postings, applications, and messages you exchange.</li>
          <li className="mb-2"><strong>Location Information:</strong> if you choose to provide a job location or use location-based filters.</li>
          <li className="mb-2"><strong>Usage Data:</strong> such as app interactions and device information.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>3. How We Use Your Information</h2>
        <p className="mb-4" style={{ color: 'var(--dark-charcoal)' }}>We use your information to:</p>
        <ul className="mb-6 ml-6" style={{ color: 'var(--dark-charcoal)' }}>
          <li className="mb-2">Provide and improve the HelpHive service.</li>
          <li className="mb-2">Enable communication between job posters and workers.</li>
          <li className="mb-2">Send important updates, notifications, and support messages.</li>
          <li className="mb-2">Maintain safety and prevent misuse of the platform.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>4. How We Share Information</h2>
        <p className="mb-4" style={{ color: 'var(--dark-charcoal)' }}>We do not sell your personal information. We may share information:</p>
        <ul className="mb-6 ml-6" style={{ color: 'var(--dark-charcoal)' }}>
          <li className="mb-2">With other users when necessary to connect posters and workers.</li>
          <li className="mb-2">With service providers that help operate our platform (e.g., hosting, analytics, chat services).</li>
          <li className="mb-2">If required by law or to protect our rights and users' safety.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>5. Data Retention</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>We keep your information only as long as necessary to provide our services and comply with legal obligations.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>6. Your Rights</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>You may update your profile information at any time. You may also request deletion of your account by contacting us.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>7. Security</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>We use reasonable measures to protect your information, but no system is completely secure.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>8. Changes to This Policy</h2>
        <p className="mb-6" style={{ color: 'var(--dark-charcoal)' }}>We may update this Privacy Policy from time to time. Updates will be posted on this page with a new "last updated" date.</p>

        <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: 'var(--primary)' }}>9. Contact Us</h2>
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

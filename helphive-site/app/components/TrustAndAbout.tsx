// components/TrustAndAbout.tsx
import { Shield, Lock, Users } from "lucide-react";

export default function TrustAndAbout() {
  return (
    <section className="px-8 lg:px-16 py-8 pointer-events-none">
      {/* Trust & Safety */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
          Your Safety, Our Priority
        </h2>
        <p className="mb-12 max-w-2xl mx-auto" style={{ color: 'var(--mid-gray)' }}>
          HelpHive is built on trust. We keep your data secure and ensure jobs
          are safe, respectful, and transparent.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Shield className="h-10 w-10 mb-4 mx-auto" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>Transparency</h3>
            <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
              Every job includes clear details so workers and hirers know what
              to expect.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Lock className="h-10 w-10 mb-4 mx-auto" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>Secure Accounts</h3>
            <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
              Protected logins with Supabase authentication and strong data
              privacy.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Users className="h-10 w-10 mb-4 mx-auto" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>Community Guidelines</h3>
            <p className="text-sm" style={{ color: 'var(--mid-gray)' }}>
              Respectful interactions only. Misuse can result in account removal.
            </p>
          </div>
        </div>
      </div>

      {/* Divider Logo */}
      <div className="flex justify-center my-8 pointer-events-none">
        <img
          src="/HelpHiveLogo.png"
          alt="HelpHive Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* About */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>About HelpHive</h2>
        <p className="mb-6" style={{ color: 'var(--mid-gray)' }}>
          HelpHive makes it simple to get things done. Whether you need a hand
          with a task or want to earn from quick jobs, our mission is to connect
          people in the community for fast, fair opportunities.
        </p>
        <p style={{ color: 'var(--mid-gray)' }}>
          Post jobs in seconds, apply with just a few taps, and stay connected
          with built-in messaging. We focus on simplicity, trust, and local
          connections.
        </p>
      </div>
    </section>
  );
}

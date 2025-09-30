// app/components/HowItWorks.tsx
import { Briefcase, Search, MessageCircle, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-8 pointer-events-none">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--dark-charcoal)' }}>
          How HelpHive Works
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Posters */}
          <div className="rounded-2xl shadow-md p-8 pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--primary)' }}>
              For Posters
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Briefcase className="w-6 h-6 mt-1" style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Post your task</strong> in just a few seconds.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 mt-1" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Get applications</strong> from nearby workers.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 mt-1" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Hire & get it done</strong> quickly and easily.
                </span>
              </li>
            </ul>
          </div>

          {/* Workers */}
          <div className="rounded-2xl shadow-md p-8 pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--primary)' }}>
              For Workers
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Search className="w-6 h-6 mt-1" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Browse available jobs</strong> posted near you.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 mt-1" style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Apply directly</strong> in the HelpHive app.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 mt-1" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--dark-charcoal)' }}>
                  <strong>Get hired & start earning</strong> right away.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// app/components/Features.tsx
import { Search, FilePlus2, ClipboardList, MessageSquare, Bell, Shuffle } from "lucide-react";

export default function Features() {
  return (
    <section className="py-8 pointer-events-none">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--dark-charcoal)' }}>
          Features That Make HelpHive Simple & Powerful
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Search className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Browse & Search Jobs
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Find nearby tasks quickly with location-based search.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <FilePlus2 className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Post Jobs in Minutes
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Create and publish jobs with a simple, fast form.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <ClipboardList className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Application Management
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Track all your applications or applicants in one place.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <MessageSquare className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Messaging Built-In
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Chat directly in-app to confirm details and updates.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Bell className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Smart Notifications
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Stay updated with alerts for new jobs, messages, or activity.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl shadow-sm p-6 text-center pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
            <Shuffle className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--dark-charcoal)' }}>
              Flexible Roles
            </h3>
            <p style={{ color: 'var(--mid-gray)' }}>
              Switch between being a worker and a hirer anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

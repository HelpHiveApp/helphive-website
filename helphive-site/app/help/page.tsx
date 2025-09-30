'use client';

import { HexBackground } from '@/components/ui/hex-background';

export default function HelpPage() {
  return (
    <div className="relative w-full">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full h-full"
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 px-8 lg:px-16 py-12 pointer-events-none">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
                Help & Support
              </h1>
              <p className="text-lg" style={{ color: 'var(--mid-gray)' }}>
                Get answers to common questions and learn how to make the most of HelpHive
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              {/* Getting Started */}
              <div className="p-8 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  Getting Started
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How do I create an account?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Click "Sign up" in the top right corner and follow the simple registration process. You'll need a valid email address to get started.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      Is HelpHive free to use?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      HelpHive is free to create an account, browse jobs, and manage applications. Some features, like posting jobs or premium options, may include a small fee in the future to support the platform. We aim to keep connecting communities simple and accessible for everyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* For Job Posters */}
              <div className="p-8 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  For Job Posters
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How do I post a job?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Click "Post a Job" from the homepage or header. Fill out the job details including title, description, location, and any specific requirements. Your job will be visible to workers in your area immediately.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How do I manage applications?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Application management is available through our mobile app. Download the HelpHive app to review applications, message candidates, and manage your posted jobs.
                    </p>
                  </div>
                </div>
              </div>

              {/* For Job Seekers */}
              <div className="p-8 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  For Job Seekers
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How do I find jobs near me?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Use the search bar on the homepage to enter your city or location. You can also browse all available jobs by clicking "View Jobs" or visiting the available jobs page.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How do I apply for jobs?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Job applications are handled through our mobile app. Download the HelpHive app to apply for jobs, message hirers, and track your applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety & Trust */}
              <div className="p-8 rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--off-white)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  Safety & Trust
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      How does HelpHive ensure safety?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      We prioritize transparency with clear job details, secure account authentication, and community guidelines. We're also working on verified user accounts for even safer connections.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                      What should I do if I encounter a problem?
                    </h3>
                    <p style={{ color: 'var(--mid-gray)' }}>
                      Report any issues or inappropriate behavior through our mobile app or contact our support team. We take community safety seriously and will investigate all reports promptly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="p-8 rounded-2xl shadow pointer-events-auto text-center" style={{ backgroundColor: 'var(--primary)' }}>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Still Need Help?
                </h2>
                <p className="text-white mb-6">
                  Can't find what you're looking for? Our support team is here to help (<span style={{ color: 'var(--accent)' }}>support@helphiveapp.com</span>).
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="mailto:support@helphiveapp.com"
                    className="font-semibold py-3 px-6 rounded-lg transition hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--accent)', 
                      color: 'var(--dark-charcoal)'
                    }}
                  >
                    Email Support
                  </a>
                  <a
                    href="/legal/terms"
                    className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-white hover:text-primary"
                  >
                    Terms & Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

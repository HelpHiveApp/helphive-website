// app/components/FeatureComparisonTable.tsx
export default function FeatureComparisonTable() {
  return (
    <section className="px-8 lg:px-16 py-8 pointer-events-none">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
          Mobile and Website Functionality
        </h2>
        
        {/* Mobile app promotion text */}
        <p className="text-lg italic mb-8" style={{ color: 'var(--mid-gray)' }}>
          Core hiring and job management features are available in our mobile app — download to manage applications and chat with candidates.
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--light-gray)' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                    <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--dark-charcoal)', borderBottom: '1px solid var(--mid-gray)' }}>
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left font-semibold" style={{ color: 'var(--dark-charcoal)', borderBottom: '1px solid var(--mid-gray)' }}>
                      On Web / On App
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--light-gray)' }}>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      Post jobs
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      ✅ Web & App
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--light-gray)' }}>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      Browse jobs
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      ✅ Web & App
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--light-gray)' }}>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      Messaging applicants / hirers
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      📱 App Only
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      Manage applications
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      📱 App Only
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      Manage Jobs
                    </td>
                    <td className="px-6 py-4" style={{ color: 'var(--dark-charcoal)' }}>
                      📱 App Only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

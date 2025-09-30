// components/FinalCTA.tsx
export default function FinalCTA() {
  return (
    <section className="py-8 px-8 lg:px-16 pointer-events-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-white py-12 px-8 text-center rounded-2xl shadow pointer-events-auto" style={{ backgroundColor: 'var(--primary)' }}>
          <h2 className="text-4xl font-bold mb-6">
            Ready to get things done?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Post a job or find work instantly. Safe, simple, and local — HelpHive makes it easy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/postjob"
              className="font-semibold py-3 px-8 rounded-lg transition hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--accent)', 
                color: 'var(--dark-charcoal)'
              }}
            >
              Post a Job
            </a>
            <a
              href="/availablejobs"
              className="border-2 font-semibold py-3 px-8 rounded-lg transition hover:shadow-lg"
              style={{ 
                borderColor: 'white',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Find Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

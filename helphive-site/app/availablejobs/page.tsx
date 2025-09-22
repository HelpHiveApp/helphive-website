'use client';

import { useState, useEffect } from 'react';
import JobCard, { Job } from '../components/JobCard';

export default function AvailableJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock job data
      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          description: 'We are looking for an experienced frontend developer to join our team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies. Experience with Next.js and Tailwind CSS is a plus.',
          salary: '$120,000 - $150,000',
          type: 'full-time',
          postedDate: '2024-01-15',
          tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
        },
        {
          id: '2',
          title: 'UX/UI Designer',
          company: 'Design Studio',
          location: 'New York, NY',
          description: 'Join our creative team as a UX/UI Designer. You will work on designing intuitive and beautiful user interfaces for web and mobile applications. Strong portfolio and experience with Figma required.',
          salary: '$80,000 - $100,000',
          type: 'full-time',
          postedDate: '2024-01-14',
          tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping']
        },
        {
          id: '3',
          title: 'Freelance Content Writer',
          company: 'Marketing Agency',
          location: 'Remote',
          description: 'We need a talented content writer to create engaging blog posts, social media content, and marketing materials. Experience in tech and SaaS industries preferred.',
          salary: '$50 - $75/hour',
          type: 'freelance',
          postedDate: '2024-01-13',
          tags: ['Content Writing', 'SEO', 'Marketing', 'Remote']
        },
        {
          id: '4',
          title: 'Backend Developer',
          company: 'StartupXYZ',
          location: 'Austin, TX',
          description: 'Looking for a backend developer to help build scalable APIs and services. Experience with Node.js, Python, or Go required. Knowledge of cloud platforms (AWS, GCP) is a plus.',
          salary: '$90,000 - $120,000',
          type: 'full-time',
          postedDate: '2024-01-12',
          tags: ['Node.js', 'Python', 'AWS', 'APIs']
        },
        {
          id: '5',
          title: 'Part-time Data Analyst',
          company: 'Analytics Co.',
          location: 'Chicago, IL',
          description: 'Part-time position for a data analyst to help with business intelligence and reporting. Strong SQL skills and experience with data visualization tools required.',
          salary: '$40,000 - $50,000',
          type: 'part-time',
          postedDate: '2024-01-11',
          tags: ['SQL', 'Data Analysis', 'Tableau', 'Business Intelligence']
        },
        {
          id: '6',
          title: 'Contract Mobile Developer',
          company: 'Mobile Solutions',
          location: 'Los Angeles, CA',
          description: '6-month contract position for an experienced mobile developer. Must have experience with React Native or Flutter. iOS and Android development experience preferred.',
          salary: '$80 - $100/hour',
          type: 'contract',
          postedDate: '2024-01-10',
          tags: ['React Native', 'Flutter', 'iOS', 'Android']
        }
      ];
      
      setJobs(mockJobs);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    console.log('Applying to job:', jobId);
    // Here you would implement the actual apply functionality
    alert(`Applied to job ${jobId}! (This is a demo)`);
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleSignup = () => {
    // Redirect to signup page
    window.location.href = '/signup';
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !locationFilter || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'var(--off-white)', color: 'var(--dark-charcoal)' }}>
      {/* Authentication Modal */}
      {showAuthModal && !isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
          
          {/* Modal content */}
          <div 
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            style={{ backgroundColor: 'var(--off-white)' }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                Log in to view current postings
              </h3>
              <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                Join the hive to access all available job opportunities.
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleLogin}
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Log In
                </button>
                <button
                  onClick={handleSignup}
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with conditional blur */}
      <div className={showAuthModal && !isAuthenticated ? 'filter blur-sm' : ''}>
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-80 py-2 border-b" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
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
      <main className="flex-1 px-8 lg:px-16 py-12">
        {/* Page header */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
            Available Jobs
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--mid-gray)' }}>
            Find your next opportunity in the hive. Browse through {jobs.length} available positions.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{ 
                  borderColor: 'var(--mid-gray)', 
                  backgroundColor: 'var(--light-gray)',
                  color: 'var(--dark-charcoal)'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{ 
                  borderColor: 'var(--mid-gray)', 
                  backgroundColor: 'var(--light-gray)',
                  color: 'var(--dark-charcoal)'
                }}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{ 
                  borderColor: 'var(--mid-gray)', 
                  backgroundColor: 'var(--light-gray)',
                  color: 'var(--dark-charcoal)'
                }}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg" style={{ color: 'var(--mid-gray)' }}>
                Loading jobs...
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                No jobs found
              </h3>
              <p style={{ color: 'var(--mid-gray)' }}>
                Try adjusting your search criteria or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </div>
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
    </div>
  );
}

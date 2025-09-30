'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import JobCard, { Job } from '../components/JobCard';
import { supabase } from '../../lib/supabase';
import { HexBackground } from '@/components/ui/hex-background';

export default function AvailableJobs() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showAppModal, setShowAppModal] = useState(false);
  
  // Check if user is authenticated
  const isAuthenticated = !!session?.user;
  const showAuthModal = status !== 'loading' && !isAuthenticated;

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'open')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching jobs:', error);
          setJobs([]);
        } else {
          setJobs(data || []);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    console.log('Applying to job:', jobId);
    setShowAppModal(true);
  };

  const handleCloseAppModal = () => {
    setShowAppModal(false);
  };

  const handleDownloadAndroid = () => {
    // Add Android app store link here
    console.log('Download Android app');
  };

  const handleDownloadIOS = () => {
    // Add iOS app store link here
    console.log('Download iOS app');
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleSignup = () => {
    // Redirect to signup page
    window.location.href = '/signup';
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.required_skills && job.required_skills.some(skill => 
                           skill.toLowerCase().includes(searchQuery.toLowerCase())
                         ));
    
    const matchesLocation = !locationFilter || 
                           (job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase()));
    
    const matchesType = !typeFilter || job.job_type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="relative w-full">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 min-h-full w-full">
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full h-full"
        />
      </div>
      
      {/* Main content - elevated above background */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none" style={{ color: 'var(--dark-charcoal)' }}>
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
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

      {/* App Download Modal */}
      {showAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={handleCloseAppModal}
          />
          
          {/* Modal content */}
          <div 
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            style={{ backgroundColor: 'var(--off-white)' }}
          >
            <div className="text-center">
              {/* Close button */}
              <button
                onClick={handleCloseAppModal}
                className="absolute top-4 right-4 text-2xl"
                style={{ color: 'var(--mid-gray)' }}
              >
                ×
              </button>
              
              {/* HelpHive Logo */}
              <div className="mb-6">
                <img 
                  src="/HelpHiveLogo.png" 
                  alt="HelpHive Logo" 
                  className="mx-auto h-16 w-auto"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                Join HelpHive
              </h3>
              <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                Connect with Hirers by downloading the app
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDownloadAndroid}
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Android
                </button>
                <button
                  onClick={handleDownloadIOS}
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  iOS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with conditional blur */}
      <div className={showAuthModal || showAppModal ? 'filter blur-sm' : ''}>
        {/* Main content */}
        <div className="px-8 lg:px-16 py-12 pointer-events-none">
        {/* Page header */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
            Available Jobs
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--mid-gray)' }}>
            Find your next opportunity in the hive. Browse through all available jobs.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 pointer-events-auto">
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
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs grid */}
        <div className="max-w-6xl mx-auto pointer-events-auto">
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
        </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { HexBackground } from '@/components/ui/hex-background';
import Header from '../components/Header';

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function PostJob() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('fixed');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Check if user is authenticated
  const isAuthenticated = !!session?.user;
  const showAuthModal = status !== 'loading' && !isAuthenticated;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleSignup = () => {
    // Redirect to signup page
    window.location.href = '/signup';
  };

  // You'll need to implement this function to get the current user email
  const getCurrentUserEmail = () => {
    // For now, return a placeholder - you can implement proper user authentication
    return 'user@example.com';
  };

  // Debounced search effect for location
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (location.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        searchPlaces(location);
      }, 300);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [location]);

  const searchPlaces = async (query: string) => {
    if (query.trim().length === 0) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsSearching(true);
    setShowPredictions(true);

    try {
      const response = await axios.post(
        'https://ybosoitfbowwbuanusvs.functions.supabase.co/get-google-places-key/autocomplete',
        { user_id: getCurrentUserEmail() },
        {
          params: { input: query },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlib3NvaXRmYm93d2J1YW51c3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODA3NTUsImV4cCI6MjA3MDA1Njc1NX0.9-fywVUxM7MMN6yeIBircmi1pdC56Fib1voE_cILbJw',
          },
        }
      );

      if (response.status === 200 && response.data) {
        const data = response.data;
        const predictions = data.predictions;

        if (predictions) {
          setPredictions(predictions.map((p: any) => ({
            place_id: p.place_id,
            description: p.description,
            structured_formatting: p.structured_formatting
          })));
        }
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setPredictions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handlePredictionSelect = (prediction: PlacePrediction) => {
    setLocation(prediction.description);
    setShowPredictions(false);
    setPredictions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement job posting API call
      const jobData = {
        title,
        description,
        job_type: jobType,
        budget: parseFloat(budget),
        location,
        required_skills: requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
        start_date: startDate || null,
        end_date: endDate || null,
      };

      console.log('Job data to submit:', jobData);
      
      // For now, just simulate success
      setTimeout(() => {
        router.push('/availablejobs');
      }, 1000);
      
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Hexagon background - positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <HexBackground
          hexagonSize={75}
          hexagonMargin={4}
          className="w-full min-h-full"
        />
      </div>
      
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
                Log in to post a job
              </h3>
              <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                Join the hive to create job postings and connect with workers.
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

      {/* Main content - elevated above background */}
      <div className={`relative z-10 min-h-screen flex flex-col pointer-events-none ${showAuthModal ? 'filter blur-sm' : ''}`} style={{ color: 'var(--dark-charcoal)' }}>
      <Header />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12 pointer-events-none">
        <div className="w-full max-w-2xl">
          <div 
            className="rounded-2xl p-8 shadow-lg pointer-events-auto"
            style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--light-gray)' }}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <img
                  src="/HelpHiveLogo.png"
                  alt="HelpHive Logo"
                  className="h-32 w-auto"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
                Create a Posting
              </h2>
              <p style={{ color: 'var(--mid-gray)' }}>
                Search for help by creating a job posting!
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="e.g. Web Developer Needed"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label 
                  htmlFor="description" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Job Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 resize-none"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="Describe the job requirements and expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="jobType" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Job Type *
                  </label>
                  <select
                    id="jobType"
                    required
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="budget" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Budget ($) *
                  </label>
                  <input
                    type="number"
                    id="budget"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    placeholder="0.00"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label 
                  htmlFor="location" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="e.g. Remote, New York, NY"
                  value={location}
                  onChange={handleLocationChange}
                  onFocus={() => setShowPredictions(predictions.length > 0)}
                />
                
                {/* Predictions dropdown */}
                {showPredictions && predictions.length > 0 && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto pointer-events-auto"
                    style={{ backgroundColor: 'var(--off-white)', border: '1px solid var(--mid-gray)' }}
                  >
                    {predictions.map((prediction) => (
                      <div
                        key={prediction.place_id}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                        onClick={() => handlePredictionSelect(prediction)}
                        style={{ color: 'var(--dark-charcoal)' }}
                      >
                        <div className="font-medium">
                          {prediction.structured_formatting?.main_text || prediction.description}
                        </div>
                        {prediction.structured_formatting?.secondary_text && (
                          <div className="text-sm" style={{ color: 'var(--mid-gray)' }}>
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="requiredSkills" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--dark-charcoal)' }}
                >
                  Required Skills
                </label>
                <input
                  type="text"
                  id="requiredSkills"
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--mid-gray)', 
                    backgroundColor: 'var(--light-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  placeholder="e.g. JavaScript, React, Node.js (comma separated)"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="startDate" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="endDate" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--dark-charcoal)' }}
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--mid-gray)', 
                      backgroundColor: 'var(--light-gray)',
                      color: 'var(--dark-charcoal)'
                    }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {isLoading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center pointer-events-none">
        <p className="text-xs" style={{ color: 'var(--mid-gray)' }}>
          <a href="/legal/terms" className="hover:underline pointer-events-auto" style={{ color: 'var(--mid-gray)' }}>Terms</a>
          {' & '}
          <a href="/legal/privacy" className="hover:underline pointer-events-auto" style={{ color: 'var(--mid-gray)' }}>Privacy</a>
        </p>
      </footer>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { HexBackground } from '@/components/ui/hex-background';
import Header from './components/Header';

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function Home() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // You'll need to implement this function to get the current user email
  const getCurrentUserEmail = () => {
    // For now, return a placeholder - you can implement proper user authentication
    return 'user@example.com';
  };

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchQuery.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        searchPlaces(searchQuery);
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
  }, [searchQuery]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handlePredictionSelect = (prediction: PlacePrediction) => {
    setSearchQuery(prediction.description);
    setShowPredictions(false);
    setPredictions([]);
    // Here you can handle what happens when a place is selected
    console.log('Selected place:', prediction);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowPredictions(false);
      // Redirect to available jobs page
      window.location.href = '/availablejobs';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePostJob = () => {
    // Always redirect to post job page - it will handle authentication protection
    window.location.href = '/postjob';
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
      
      {/* Main content - can grow naturally */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none" style={{ color: 'var(--dark-charcoal)' }}>
        <Header />

      {/* Main content area */}
        <main>
          {/* Combined section - Post jobs and Find work */}
          <section className="flex flex-col items-center justify-center px-8 lg:px-16 py-20 gap-16 min-h-screen pointer-events-none">
            
            {/* Post a job section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl">
              {/* Left content */}
              <div className="w-full lg:w-1/2 max-w-lg text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
                  Post jobs. Find work.
                </h2>
                <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                  Join the hive - where hirers and job seekers connect.
                </p>

                {/* Post a job button */}
                <div className="max-w-md mx-auto lg:mx-0 pointer-events-auto">
                  <button 
                    className="w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--accent)', 
                      color: 'var(--dark-charcoal)',
                      border: 'none'
                    }}
                    onClick={handlePostJob}
                  >
                    Post a job
                  </button>
                </div>
              </div>

              {/* Right content (image) */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-lg">
                  <img
                    src="/LandingImageHirer.png"
                    alt="HelpHive illustration for hirers"
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Search section - Find work */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl">
              {/* Left content (image) */}
              <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
                <div className="w-full max-w-lg">
                  <img
                    src="/LandingImage.png"
                    alt="HelpHive illustration for job seekers"
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* Right content (search functionality) */}
              <div className="w-full lg:w-1/2 max-w-lg text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
                  Find your next opportunity
                </h2>
                <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
                  Search for jobs in your area and connect with hirers.
                </p>

                {/* Search bar */}
                <div className="relative max-w-md mx-auto lg:mx-0 pointer-events-auto">
                  <div className="flex items-center rounded-xl shadow-sm overflow-hidden" style={{ border: '1px solid var(--mid-gray)', backgroundColor: 'var(--light-gray)' }}>
                    <input
                      type="text"
                      placeholder="Enter a city or location"
                      className="flex-1 px-4 py-3 outline-none"
                      style={{ color: 'var(--dark-charcoal)', backgroundColor: 'transparent' }}
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setShowPredictions(predictions.length > 0)}
                    />
                    <button 
                      className="search-button px-6 py-3"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                  
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
              </div>
            </div>
          </section>

          {/* HERO SECTION OVER */}
          {/* Divider */}
          {/* <div className="w-full max-w-4xl h-px" style={{ backgroundColor: 'var(--light-gray)' }}></div> */}

          {/* Mobile app promotion text */}
          <section className="flex justify-center px-8 lg:px-16 py-8 pointer-events-none">
            <div className="text-center max-w-4xl">
              <p className="text-lg italic" style={{ color: 'var(--mid-gray)' }}>
                Core hiring and job management features are available in our mobile app — download to manage applications and chat with candidates.
              </p>
            </div>
          </section>

          {/* Feature comparison table */}
          <section className="flex justify-center px-8 lg:px-16 py-8 pointer-events-none">
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
          </section>
        </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center pointer-events-auto">
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

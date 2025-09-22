'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--off-white)', color: 'var(--dark-charcoal)' }}>
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-80 py-2 border-b" style={{ borderColor: 'var(--dark-charcoal)', backgroundColor: 'var(--dark-charcoal)' }}>
        <h1 className="text-lg font-bold font-ubuntu" style={{ color: 'var(--primary)' }}>HelpHive</h1>
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

      {/* Main hero section */}
      <main className="flex flex-col lg:flex-row flex-1 items-center justify-center px-8 lg:px-16 py-12 gap-8 lg:gap-16">
        {/* Left content */}
        <div className="w-full lg:w-1/2 max-w-lg text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--dark-charcoal)' }}>
            Post jobs. Find work.
          </h2>
          <p className="mb-8" style={{ color: 'var(--mid-gray)' }}>
            Join the hive - where hirers and job seekers connect.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto lg:mx-0">
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
                className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
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

        {/* Right content (image placeholder) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-lg">
            <img
              src="/LandingImage.png"
              alt="HelpHive illustration"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
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
  );
}

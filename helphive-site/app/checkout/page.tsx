'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HexBackground } from '@/components/ui/hex-background';
import { supabase } from '../../lib/supabase';

interface JobData {
  title: string;
  description: string;
  job_type: 'fixed' | 'hourly';
  budget: number;
  currency_code: string;
  location: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  country_id: string | null;
  required_skills: string[];
  start_date: string | null;
  end_date: string | null;
  poster_id: string;
  status: 'open';
  service_fee: number;
  discount: number;
}

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user arrived from postjob page
    const fromPostJob = searchParams.get('from');
    
    if (fromPostJob !== 'postjob') {
      // Redirect to home if not coming from postjob page
      router.push('/');
    } else {
      setIsAuthorized(true);
      
      // Load job data from sessionStorage
      const storedData = sessionStorage.getItem('checkoutJobData');
      if (storedData) {
        setJobData(JSON.parse(storedData));
      }
    }
  }, [searchParams, router]);

  const handleCompleteCheckout = async () => {
    if (!jobData) {
      setError('No job data available');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Submitting job data:', jobData);

      // Insert job into Supabase
      const { data, error: supabaseError } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError('Failed to create job posting. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('Job created successfully:', data);
      
      // Clear sessionStorage
      sessionStorage.removeItem('checkoutJobData');
      
      // Redirect to available jobs page on success
      router.push('/availablejobs');
      
    } catch (error) {
      console.error('Error creating job:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Don't render anything until authorization is verified
  if (!isAuthorized) {
    return null;
  }

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
      <div className="relative z-10 min-h-screen flex flex-col" style={{ color: 'var(--dark-charcoal)' }}>
        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-2xl">
            <div 
              className="rounded-2xl p-8 shadow-lg"
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
                  Checkout
                </h2>
                <p style={{ color: 'var(--mid-gray)' }}>
                  Complete your job posting
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                  {error}
                </div>
              )}

              {/* Content */}
              <div className="space-y-6">
                {/* Job Summary Section */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--light-gray)' }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                    Job Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Title:</span>
                      <span className="font-medium" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.title || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Job Type:</span>
                      <span className="font-medium" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.job_type ? (jobData.job_type === 'fixed' ? 'Fixed Price' : 'Hourly Rate') : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Currency:</span>
                      <span className="font-medium" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.currency_code || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Budget:</span>
                      <span className="font-medium" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.budget ? `${jobData.currency_code} ${jobData.budget.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Location:</span>
                      <span className="font-medium" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.location || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown Section */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--light-gray)' }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--dark-charcoal)' }}>
                    Payment Breakdown
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Budget:</span>
                      <span style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.budget ? `${jobData.currency_code} ${jobData.budget.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--mid-gray)' }}>Service Fee:</span>
                      <span style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.budget && jobData?.service_fee ? `${jobData.currency_code} ${jobData.service_fee.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                    {jobData?.discount && jobData.discount > 0 && jobData.service_fee && (
                      <div className="flex justify-between">
                        <span style={{ color: '#10b981' }}>Discount ({jobData.discount}%):</span>
                        <span style={{ color: '#10b981' }}>
                          -{jobData.currency_code} {(jobData.service_fee * (jobData.discount / 100)).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Divider line */}
                  <div 
                    className="border-t mb-4"
                    style={{ borderColor: 'var(--mid-gray)' }}
                  />
                  
                  {/* Total box */}
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold" style={{ color: 'var(--dark-charcoal)' }}>
                        Total:
                      </span>
                      <span className="text-xl font-bold" style={{ color: 'var(--dark-charcoal)' }}>
                        {jobData?.budget && jobData?.service_fee 
                          ? `${jobData.currency_code} ${(
                              jobData.budget + 
                              jobData.service_fee - 
                              (jobData.discount && jobData.discount > 0 ? jobData.service_fee * (jobData.discount / 100) : 0)
                            ).toFixed(2)}` 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-3 px-6 rounded-xl font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--accent)' }}
                  onClick={handleCompleteCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Complete Checkout'}
                </button>

                <button
                  className="w-full py-3 px-6 rounded-xl font-medium transition-opacity duration-200 hover:opacity-90"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid var(--mid-gray)',
                    color: 'var(--dark-charcoal)'
                  }}
                  onClick={() => router.back()}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

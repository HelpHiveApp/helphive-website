'use client';

interface Job {
  id: string;
  title: string;
  description: string;
  job_type: 'fixed' | 'hourly';
  budget: number;
  location?: string;
  required_skills?: string[];
  start_date?: string;
  end_date?: string;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  poster_id: string;
  worker_id?: string;
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fixed':
        return 'var(--primary)';
      case 'hourly':
        return 'var(--primary)';
      default:
        return 'var(--mid-gray)';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'var(--primary)';
      case 'assigned':
        return 'var(--accent)';
      case 'completed':
        return 'var(--slate-blue)';
      case 'cancelled':
        return 'var(--mid-gray)';
      default:
        return 'var(--mid-gray)';
    }
  };

  const formatBudget = (budget: number, jobType: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    if (jobType === 'hourly') {
      return `${formatter.format(budget)}/hr`;
    } else {
      return formatter.format(budget);
    }
  };

  return (
    <div 
      className="rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200"
      style={{ 
        backgroundColor: 'var(--off-white)', 
        borderColor: 'var(--light-gray)',
        color: 'var(--dark-charcoal)'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dark-charcoal)' }}>
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--mid-gray)' }}>
            {job.location && (
              <>
                <span>{job.location}</span>
                <span>•</span>
              </>
            )}
            <span>{formatDate(job.created_at)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: getTypeColor(job.job_type) }}
          >
            {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}
          </div>
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: getStatusColor(job.status) }}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--mid-gray)' }}>
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.required_skills && job.required_skills.length > 0 ? (
          job.required_skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs"
              style={{ 
                backgroundColor: 'var(--light-gray)', 
                color: 'var(--dark-charcoal)' 
              }}
            >
              {skill}
            </span>
          ))
        ) : (
          <span
            className="px-2 py-1 rounded text-xs"
            style={{ 
              backgroundColor: 'var(--light-gray)', 
              color: 'var(--mid-gray)',
              fontStyle: 'italic'
            }}
          >
            No special skills listed
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
            {formatBudget(job.budget, job.job_type)}
          </span>
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--accent)', 
            color: 'var(--background)' 
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export type { Job, JobCardProps };

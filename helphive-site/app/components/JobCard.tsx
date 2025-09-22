'use client';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  postedDate: string;
  tags?: string[];
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
      case 'full-time':
        return 'var(--primary)';
      case 'part-time':
        return 'var(--accent)';
      case 'contract':
        return 'var(--slate-blue)';
      case 'freelance':
        return 'var(--mid-gray)';
      default:
        return 'var(--mid-gray)';
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
            <span className="font-medium">{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span>{formatDate(job.postedDate)}</span>
          </div>
        </div>
        <div 
          className="px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: getTypeColor(job.type) }}
        >
          {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--mid-gray)' }}>
        {job.description}
      </p>

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs"
              style={{ 
                backgroundColor: 'var(--light-gray)', 
                color: 'var(--dark-charcoal)' 
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div>
          {job.salary && (
            <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
              {job.salary}
            </span>
          )}
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--primary)', 
            color: 'white' 
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export type { Job, JobCardProps };

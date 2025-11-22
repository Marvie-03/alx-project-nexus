import React from "react";
import Link from "next/link";
import { Job } from "@/interfaces";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="group relative flex flex-col rounded-lg border border-slate-400 bg-white p-6 transition-all hover:shadow-md">
      {/* Header: Logo & Title */}
      <div className="flex items-start gap-4">
        {/* Fallback for logo if image fails (simulated) */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
          {job.logo ? (
            <Image src={job.logo} alt={`${job.company} logo`} width={40} height={40} className="h-8 w-8 object-contain" />
          ) : (
            <Building2 className="h-6 w-6 text-slate-400" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-sm font-medium text-slate-600">{job.company}</p>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 sm:flex sm:gap-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>{job.salaryRange}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.isRemote && <Badge variant="green">Remote</Badge>}
        <Badge variant="blue">{job.experience}</Badge>
        {job.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="gray">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Action Area */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400">Posted {job.postedDate}</span>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
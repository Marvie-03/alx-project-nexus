import React from "react";
import { useJobs } from "@/context/JobContext";
import { JobCard } from "@/components/molecules/JobCard";
import { Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export const JobGrid = () => {
  const { filteredJobs, loading, error, clearFilters } = useJobs();

  if (loading) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-slate-600">Finding opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600 mb-2">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-400 bg-slate-50 text-center">
        <div className="rounded-full bg-slate-100 p-4">
          <SearchX className="h-8 w-8 text-slate-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">No jobs found</h3>
          <p className="text-sm text-slate-600">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
        <Button onClick={clearFilters} variant="primary">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
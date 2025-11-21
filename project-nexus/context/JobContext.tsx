import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Job, JobContextType, FilterState } from "@/interfaces";
import { api } from "@/lib/api";

const defaultFilters: FilterState = {
  search: "",
  location: "",
  type: "",
  experience: "",
  isRemote: false,
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  // Fetch jobs on mount
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const data = await api.fetchJobs();
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Update filters helper
  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => setFiltersState(defaultFilters);

  // Advanced Filtering Logic (Memoized for performance)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesLocation =
        filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesType = filters.type === "" || job.type === filters.type;
      
      const matchesExperience =
        filters.experience === "" || job.experience === filters.experience;

      const matchesRemote = filters.isRemote ? job.isRemote : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesExperience &&
        matchesRemote
      );
    });
  }, [jobs, filters]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        loading,
        error,
        filters,
        setFilters,
        clearFilters,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

// Custom Hook for easy consumption
export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
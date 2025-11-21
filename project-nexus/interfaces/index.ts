export type JobType = "Full-Time" | "Part-Time" | "Contract" | "Freelance";
export type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead";

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // URL to image
  location: string;
  salaryRange: string;
  type: JobType;
  experience: ExperienceLevel;
  tags: string[]; // e.g., ["Remote", "TypeScript", "React"]
  postedDate: string; // ISO string or relative text
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
}

export interface FilterState {
  search: string;
  location: string;
  type: JobType | "";
  experience: ExperienceLevel | "";
  isRemote: boolean;
}

export interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void; // functional update
  clearFilters: () => void;
}
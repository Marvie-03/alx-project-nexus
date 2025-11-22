import React from "react";
import { useJobs } from "@/context/JobContext";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { X } from "lucide-react";

export const FilterSidebar = () => {
  const { filters, setFilters, clearFilters } = useJobs();

  return (
    <aside className="w-full space-y-6 rounded-lg border border-slate-400 bg-white p-6 lg:w-72 lg:shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        {(filters.search || filters.location || filters.type || filters.experience || filters.isRemote) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">Search</label>
        <Input
          placeholder="Title, company, keyword..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">Location</label>
        <Input
          placeholder="City, state, or zip"
          value={filters.location}
          onChange={(e) => setFilters({ location: e.target.value })}
        />
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">Job Type</label>
        <Select
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value as any })}
          placeholder="Any Type"
          options={[
            { label: "Full-Time", value: "Full-Time" },
            { label: "Part-Time", value: "Part-Time" },
            { label: "Contract", value: "Contract" },
            { label: "Freelance", value: "Freelance" },
          ]}
        />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">Experience Level</label>
        <Select
          value={filters.experience}
          onChange={(e) => setFilters({ experience: e.target.value as any })}
          placeholder="Any Level"
          options={[
            { label: "Entry Level", value: "Entry" },
            { label: "Mid Level", value: "Mid" },
            { label: "Senior Level", value: "Senior" },
            { label: "Lead / Manager", value: "Lead" },
          ]}
        />
      </div>

      {/* Remote Toggle */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="remote"
          checked={filters.isRemote}
          onChange={(e) => setFilters({ isRemote: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="remote" className="text-sm font-medium text-slate-900 select-none">
          Remote Only
        </label>
      </div>
    </aside>
  );
};
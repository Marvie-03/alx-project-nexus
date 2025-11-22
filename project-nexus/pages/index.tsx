import { MainLayout } from "@/components/templates/MainLayout";
import { FilterSidebar } from "@/components/organisms/FilterSidebar";
import { JobGrid } from "@/components/organisms/JobGrid";

export default function Home() {
  return (
    <MainLayout>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Find Your Next Developer Role
        </h1>
        <p className="text-lg text-slate-600">
          Discover opportunities from top tech companies around the world.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Sidebar */}
        <FilterSidebar />

        {/* Right Column: Job Grid */}
        <div className="flex-1">
          <JobGrid />
        </div>
      </div>
    </MainLayout>
  );
}
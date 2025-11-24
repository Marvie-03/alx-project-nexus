import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Job } from "@/interfaces";
import { api } from "@/lib/api";
import { MainLayout } from "@/components/templates/MainLayout";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Globe, 
  Share2, 
  Bookmark 
} from "lucide-react";
import Image from "next/image";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        // In a real app, you would handle 404s here if fetch returns null
        const data = await api.fetchJobById(id as string);
        if (!data) {
          setError("Job not found");
        } else {
          setJob(data);
        }
      } catch (err) {
        setError("An error occurred while fetching the job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [router.isReady, id]);

  // --- Loading State ---
  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-200" />
            <div className="h-4 w-48 rounded bg-slate-200" />
          </div>
        </div>
      </MainLayout>
    );
  }

  // --- Error / Not Found State ---
  if (error || !job) {
    return (
      <MainLayout>
        <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Job Not Found</h1>
          <p className="text-slate-600">
            The job you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`${job.title} at ${job.company} - DevJobs`}>
      {/* Back Link */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-primary">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to listings
        </Link>
      </div>

      {/* Main Content Wrapper */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* LEFT COLUMN: Job Info & Description */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="rounded-lg border border-slate-400 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                {/* Logo */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
                  {job.logo ? (
                    <Image src={job.logo} alt={job.company} width={40} height={40} className="h-full w-full object-contain" />
                  ) : (
                    <Building2 className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                
                {/* Title & Company */}
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {job.title}
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-slate-600">
                    <span className="font-medium text-primary">{job.company}</span>
                    <span>•</span>
                    <span className="text-sm">Posted {job.postedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Badges */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 rounded-md bg-slate-50 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-slate-50 px-3 py-1.5">
                <DollarSign className="h-4 w-4 text-slate-400" />
                {job.salaryRange}
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-slate-50 px-3 py-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                {job.type}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {job.isRemote && <Badge variant="green">Remote</Badge>}
              <Badge variant="blue">{job.experience}</Badge>
              {job.tags.map((tag) => (
                <Badge key={tag} variant="gray">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Job Description Section */}
          <div className="rounded-lg border border-slate-400 bg-white p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Job Description</h2>
            <p className="mb-6 leading-relaxed text-slate-600">
              {job.description}
            </p>

            {/* Responsibilities */}
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Responsibilities</h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-600">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Requirements */}
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Qualifications</h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-600">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
             {/* Benefits */}
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Benefits</h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-600">
              {job.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar / Actions */}
        <div className="space-y-6">
          
          {/* Apply Card */}
          <div className="rounded-lg border border-slate-400 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Interested in this job?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Review the requirements and apply now to join the team at {job.company}.
            </p>
            
            <div className="mt-6 space-y-3">
              
              <Link href={`/jobs/${job.id}/apply`} className="w-full">
                <Button className="w-full" size="lg">Apply Now</Button>
              </Link>
              
              <Button variant="outline" className="w-full">
                <Bookmark className="mr-2 h-4 w-4" />
                Save Job
              </Button>
            </div>
          </div>

          {/* Company Info Card */}
          <div className="rounded-lg border border-slate-400 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              About the company
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-50 border border-slate-200">
                 {job.logo ? (
                    <Image src={job.logo} alt={job.company} width={32} height={32} className="h-8 w-8 object-contain" />
                  ) : (
                    <Building2 className="h-6 w-6 text-slate-400" />
                  )}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{job.company}</p>
                <Link href="#" className="text-sm text-primary hover:underline">
                  View all jobs
                </Link>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{job.company.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
               <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Technology</span>
              </div>
            </div>
          </div>

          {/* Share Card */}
          <div className="rounded-lg border border-slate-400 bg-white p-6">
             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Share this job
            </h3>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
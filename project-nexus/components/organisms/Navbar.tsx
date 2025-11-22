import React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Hexagon } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-400 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="h-8 w-8 text-primary fill-primaryfill-primary-light" />
          <span className="text-xl font-bold text-slate-900">DevJobs</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary">
            Find Jobs
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary">
            Companies
          </Link>
          <div className="hidden sm:block h-6 w-px bg-slate-200" />
          <Button size="sm">Post a Job</Button>
        </div>
      </div>
    </header>
  );
};
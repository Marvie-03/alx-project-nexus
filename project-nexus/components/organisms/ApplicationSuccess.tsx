import React from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface ApplicationSuccessProps {
  jobTitle: string;
}

export const ApplicationSuccess: React.FC<ApplicationSuccessProps> = ({ jobTitle }) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
        <Rocket className="h-12 w-12 text-primary" />
      </div>
      <h2 className="mb-2 text-3xl font-bold text-slate-900">
        Your Application is on its way!
      </h2>
      <p className="mb-8 max-w-md text-slate-600">
        Your application for <span className="font-semibold text-slate-900">{jobTitle}</span> has been sent. Youa&apos;ll receive an email confirmation shortly.
      </p>
      
      <div className="flex gap-4">
        <Link href="/">
          <Button>Explore More Jobs</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Track Application</Button>
        </Link>
      </div>
    </div>
  );
};
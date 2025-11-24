import Link from "next/link";
import { MainLayout } from "@/components/templates/MainLayout";
import { Button } from "@/components/atoms/Button";
import { Ghost } from "lucide-react";

export default function Custom404() {
  return (
    <MainLayout title="Page Not Found - DevJobs">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-slate-100 p-6">
          <Ghost className="h-16 w-16 text-slate-400" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">404</h1>
        <h2 className="mb-4 text-xl font-semibold text-slate-700">Page not found</h2>
        <p className="mb-8 max-w-md text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
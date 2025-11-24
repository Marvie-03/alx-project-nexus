import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/lib/api";
import { Job } from "@/interfaces";
import { MainLayout } from "@/components/templates/MainLayout";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FileUpload } from "@/components/molecules/FileUpload";
import { ApplicationSuccess } from "@/components/organisms/ApplicationSuccess";
import { AlertCircle } from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    file: null as File | null,
  });

  // Error State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch Job Data for Context
  useEffect(() => {
    if (!router.isReady) return;
    api.fetchJobById(id as string).then((data) => {
      if (data) setJob(data);
      else router.push("/404");
    });
  }, [id, router.isReady]);

  // Validation Logic
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.file) newErrors.file = "A resume or CV file is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      setSubmitError("Please correct the errors below to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitApplication(id as string, formData);
      setIsSuccess(true);
      window.scrollTo(0,0);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return null; // Or a loading spinner

  if (isSuccess) {
    return (
      <MainLayout>
        <ApplicationSuccess jobTitle={job.title} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Apply for ${job.title}`}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Apply for {job.title}
          </h1>
          <p className="text-slate-600">
            Please fill out the form below to submit your application to {job.company}.
          </p>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-700 animate-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Couldn&apos;t submit your application</h3>
              <p className="text-sm mt-1">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-slate-400 bg-white p-6 sm:p-8">
          
          {/* Personal Info Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">First Name <span className="text-red-500">*</span></label>
                <Input 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Last Name <span className="text-red-500">*</span></label>
                <Input 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Email <span className="text-red-500">*</span></label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500 bg-red-50" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Phone Number</label>
              <Input 
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* Documents Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Documents</h2>
            <FileUpload 
              onFileSelect={(file) => setFormData({...formData, file})} 
              error={errors.file}
            />
          </section>

          <hr className="border-slate-200" />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
             <Button 
              type="submit" 
              isLoading={isSubmitting} 
              className="flex-1"
              size="lg"
            >
              Submit Application
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
           
          </div>

        </form>
      </div>
    </MainLayout>
  );
}
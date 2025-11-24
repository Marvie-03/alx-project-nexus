import React from "react";
import Head from "next/head";
import { Navbar } from "@/components/organisms/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title = "DevJobs - Find Your Next Role" }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find the best developer jobs in tech." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
};
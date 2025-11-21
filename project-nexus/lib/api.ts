import { Job } from "@/interfaces";
import { MOCK_JOBS } from "./data";

// Simulate network delay (e.g., 800ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  fetchJobs: async (): Promise<Job[]> => {
    await delay(800);
    // Optional: Simulate random error for testing
    // if (Math.random() > 0.9) throw new Error("Failed to fetch jobs");
    return MOCK_JOBS;
  },

  fetchJobById: async (id: string): Promise<Job | null> => {
    await delay(500);
    const job = MOCK_JOBS.find((j) => j.id === id);
    return job || null;
  },
};
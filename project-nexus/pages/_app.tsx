import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { JobProvider } from "@/context/JobContext"; // Import Provider

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </main>
  );
}
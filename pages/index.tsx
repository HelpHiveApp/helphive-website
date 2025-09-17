// app/page.tsx (Next.js 13+ with App Router)
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1E293B]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        {/* Logo Placeholder */}
        <div className="mb-6">
          {/* Replace with your logo */}
          <div className="h-20 w-20 bg-[#14B8A6] rounded-full flex items-center justify-center text-white font-bold">
            Logo
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          HelpHive – Connecting Work and Opportunity
        </h1>
        <p className="text-lg text-[#475569] max-w-xl mb-8">
          A platform that helps workers and hirers connect quickly, easily, and
          fairly.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-lg bg-[#14B8A6] text-white font-medium shadow hover:bg-[#0d9488] transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg bg-[#F5C83C] text-[#1E293B] font-medium shadow hover:bg-[#e6b632] transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 rounded-2xl bg-[#F1F5F9] shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Browse Jobs</h3>
            <p className="text-[#475569]">
              Easily find opportunities tailored to your skills and interests.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F1F5F9] shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Post Work</h3>
            <p className="text-[#475569]">
              Reach reliable workers and get your tasks completed quickly.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F1F5F9] shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2">Track Progress</h3>
            <p className="text-[#475569]">
              Stay updated with real-time progress and manage your work easily.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#1E293B] text-center text-white">
        {/* Logo Placeholder */}
        <div className="mb-4">
          {/* Replace with your logo */}
          <div className="h-10 w-10 bg-[#F5C83C] rounded-full mx-auto flex items-center justify-center text-[#1E293B] font-bold">
            L
          </div>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} HelpHive. All rights reserved.</p>
        <div className="mt-2">
          <a href="/terms" className="underline text-[#F5C83C] hover:text-[#e6b632]">
            Terms & Privacy
          </a>
        </div>
      </footer>
    </main>
  );
}

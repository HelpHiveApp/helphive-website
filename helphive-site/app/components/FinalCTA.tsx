// components/FinalCTA.tsx
export default function FinalCTA() {
  return (
    <section className="bg-[#14B8A6] text-white py-20 px-8 lg:px-16 text-center rounded-t-3xl">
      <h2 className="text-4xl font-bold mb-6">
        Ready to get things done?
      </h2>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Post a job or find work instantly. Safe, simple, and local — HelpHive makes it easy.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <a
          href="/post-job"
          className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition"
        >
          Post a Job
        </a>
        <a
          href="/search-jobs"
          className="border border-white hover:bg-white hover:text-[#14B8A6] font-semibold py-3 px-8 rounded-lg transition"
        >
          Find Work
        </a>
      </div>
    </section>
  );
}

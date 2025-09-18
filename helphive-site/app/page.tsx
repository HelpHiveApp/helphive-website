// app/page.tsx (Next.js 13+ with App Router)

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1E293B]">
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-80 py-2 border-b border-[#1E293B] bg-[#1E293B]">
        <h1 className="text-lg font-bold text-teal-600 font-ubuntu">HelpHive</h1>
        <nav className="flex space-x-3">
          <a
            href="/help"
            className="bg-amber-400 text-black text-xs px-2 py-1 rounded hover:bg-amber-500 transition"
          >
            Help
          </a>
          <a
            href="/login"
            className="bg-amber-400 text-black text-xs px-2 py-1 rounded hover:bg-amber-500 transition"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="bg-amber-400 text-black text-xs px-2 py-1 rounded hover:bg-amber-500 transition"
          >
            Sign up
          </a>
        </nav>
      </header>

      {/* Main hero section */}
      <main className="flex flex-col lg:flex-row flex-1 items-center justify-between px-6 lg:px-12 py-12 gap-12">
        {/* Left content */}
        <div className="w-full lg:w-1/2 max-w-lg text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Post jobs. Find work.
          </h2>
          <p className="text-gray-600 mb-8">
            Join the hive - where hirers and job seekers connect.
          </p>

          {/* Search bar */}
          <div className="flex items-center border rounded-xl shadow-sm overflow-hidden max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Enter a city or location"
              className="flex-1 px-4 py-3 outline-none text-gray-700"
            />
            <button className="bg-teal-600 text-white px-6 py-3 hover:bg-teal-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Right content (image placeholder) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <img
              src="/LandingImage.png"
              alt="HelpHive illustration"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

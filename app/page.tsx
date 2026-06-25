import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import { redirect } from "next/navigation";
import { Music2, BarChart3, Clock } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-[#121212] to-black text-white relative overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1DB954] rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#1DB954] rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>

      <div className="z-10 flex flex-col items-center max-w-3xl text-center space-y-8">
        <div className="p-4 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-4 inline-flex items-center justify-center">
          <Music2 className="w-12 h-12 text-[#1DB954]" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Discover Your <span className="text-[#1DB954]">Sound</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl">
          Get deep insights into your listening habits. View your most played tracks, top artists, and generate aesthetic receipts of your music taste.
        </p>

        <div className="pt-8">
          <LoginButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-white/10 pt-16">
          <div className="flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold">Detailed Stats</h3>
            <p className="text-gray-400">See exactly who you listen to the most, ranked perfectly.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold">Time Travel</h3>
            <p className="text-gray-400">Filter your stats by the last 4 weeks, 6 months, or all time.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
              <Music2 className="w-5 h-5 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold">Receiptify Style</h3>
            <p className="text-gray-400">Beautiful, shareable views of your music personality.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

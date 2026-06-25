"use client";

import { useState } from "react";
import Image from "next/image";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { getDashboardData } from "@/app/actions";

export default function DashboardClient({ initialData, session }: any) {
  const [data, setData] = useState(initialData);
  const [timeRange, setTimeRange] = useState("short_term");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tracks"); // "tracks" | "artists"

  const handleTimeRangeChange = async (range: string) => {
    setTimeRange(range);
    setLoading(true);
    try {
      const newData = await getDashboardData(range);
      setData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center font-bold text-black">
              {session.user?.name?.[0] || "U"}
            </div>
          )}
          <span className="font-bold hidden sm:block">{session.user?.name}</span>
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight">Your Stats</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Main Tabs */}
          <div className="flex bg-white/5 rounded-full p-1 w-fit">
            <button
              onClick={() => setActiveTab("tracks")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                activeTab === "tracks" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Top Tracks
            </button>
            <button
              onClick={() => setActiveTab("artists")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                activeTab === "artists" ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Top Artists
            </button>
          </div>

          {/* Time Range */}
          <div className="flex bg-white/5 rounded-full p-1 w-fit">
            {[
              { id: "short_term", label: "4 Weeks" },
              { id: "medium_term", label: "6 Months" },
              { id: "long_term", label: "All Time" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => handleTimeRangeChange(range.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                  timeRange === range.id ? "bg-[#1DB954] text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#1DB954]" />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === "tracks" && (
              <div className="space-y-4">
                {data.tracks.map((track: any, index: number) => (
                  <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="w-6 text-right text-gray-500 font-mono text-sm group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    {track.album.images?.[0] && (
                      <Image
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-white truncate">{track.name}</span>
                      <span className="text-sm text-gray-400 truncate">
                        {track.artists.map((a: any) => a.name).join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "artists" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data.artists.map((artist: any, index: number) => (
                  <div key={artist.id} className="flex flex-col items-center gap-3 group">
                    <div className="relative w-full aspect-square rounded-full overflow-hidden mb-2">
                      {artist.images?.[0] ? (
                        <Image
                          src={artist.images[0].url}
                          alt={artist.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                          <span className="text-2xl text-gray-500">{artist.name[0]}</span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <span className="font-semibold text-center leading-tight line-clamp-2">
                      {artist.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

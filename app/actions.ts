"use server";

import { auth } from "@/auth";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify";

export async function getDashboardData(timeRange: string) {
  const session = await auth();
  
  if (!session || !session.accessToken) {
    throw new Error("Not authenticated");
  }

  try {
    const [tracks, artists, recent] = await Promise.all([
      getTopTracks(session.accessToken, timeRange),
      getTopArtists(session.accessToken, timeRange),
      getRecentlyPlayed(session.accessToken)
    ]);

    return {
      tracks: tracks.items || [],
      artists: artists.items || [],
      recent: recent.items || [],
      user: session.user
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch Spotify data");
  }
}

"use server";

import { auth } from "@/auth";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify";
import { headers } from "next/headers";

export async function getDashboardData(timeRange: string) {
  const requestHeaders = await headers();
  
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });
  
  if (!session) {
    throw new Error("Not authenticated");
  }

  // Get the Spotify access token from the stored account credentials
  const tokenData = await auth.api.getAccessToken({
    body: { providerId: "spotify", userId: session.user.id },
    headers: requestHeaders,
  });

  if (!tokenData?.accessToken) {
    throw new Error("No Spotify access token found");
  }

  try {
    const [tracks, artists, recent] = await Promise.all([
      getTopTracks(tokenData.accessToken, timeRange),
      getTopArtists(tokenData.accessToken, timeRange),
      getRecentlyPlayed(tokenData.accessToken),
    ]);

    return {
      tracks: tracks.items || [],
      artists: artists.items || [],
      recent: recent.items || [],
      user: session.user,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch Spotify data");
  }
}


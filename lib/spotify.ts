export const getTopTracks = async (accessToken: string, timeRange = "short_term") => {
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 3600 } // Cache for 1 hour if possible, though since token varies per user we might want dynamic fetching.
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch top tracks");
  }
  
  return res.json();
};

export const getTopArtists = async (accessToken: string, timeRange = "short_term") => {
  const res = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch top artists");
  }
  
  return res.json();
};

export const getRecentlyPlayed = async (accessToken: string) => {
  const res = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch recently played");
  }
  
  return res.json();
};

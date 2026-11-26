export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album: string;
  albumId?: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  source: 'innertube' | 'audius' | 'jamendo' | 'demo';
  sourceId?: string;
  liked?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  isCustom?: boolean;
  isLikedSongs?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  monthlyListeners: string;
  coverUrl: string;
  verified: boolean;
  bio: string;
  topTracks: Track[];
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface LyricsData {
  synced: boolean;
  lines: LyricLine[];
  source: string;
}

export interface AudioEngineSettings {
  normalizationLufs: number; // -14 LUFS default
  isWarmthProfile: boolean;
  codec: 'opus' | 'aac' | 'vorbis';
  bitrateKbps: number;
}

export interface WrappedData {
  year: number;
  minutesListened: number;
  topPercent: string;
  topArtist: {
    name: string;
    coverUrl: string;
    minutes: number;
    mostPlayedSong: string;
    plays: number;
  };
  topTracks: Track[];
  topGenres: string[];
  soundPersonality: {
    title: string;
    description: string;
    auraColors: [string, string];
  };
}

export type ViewMode = 'home' | 'search' | 'library' | 'album' | 'artist' | 'playlist' | 'wrapped' | 'tv-now-playing';
export type DeviceView = 'mobile' | 'desktop' | 'tv';

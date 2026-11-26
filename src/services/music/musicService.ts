import { Track, Playlist, Album, Artist, WrappedData } from '../../types';

// Curated seed dataset representing Spotify's iconic catalog adapted for Aningu
export const SEED_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Nights',
    artist: 'Frank Ocean',
    album: 'Blonde',
    duration: 307,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-2',
    title: 'Ivy',
    artist: 'Frank Ocean',
    album: 'Blonde',
    duration: 249,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-3',
    title: 'Pink + White',
    artist: 'Frank Ocean',
    album: 'Blonde',
    duration: 184,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=electronic-future-beats-117997.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-4',
    title: 'Nikes',
    artist: 'Frank Ocean',
    album: 'Blonde',
    duration: 314,
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_82c5f1c9c7.mp3?filename=tvari-tokyo-cafe-159065.mp3',
    source: 'demo',
    liked: false,
  },
  {
    id: 'track-5',
    title: 'Kill Bill',
    artist: 'SZA',
    album: 'SOS',
    duration: 153,
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1e01.mp3?filename=in-the-forest-ambient-acoustic-guitar-12179.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-6',
    title: 'Snooze',
    artist: 'SZA',
    album: 'SOS',
    duration: 201,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_273574c7db.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    source: 'demo',
    liked: false,
  },
  {
    id: 'track-7',
    title: 'Squabble Up',
    artist: 'Kendrick Lamar',
    album: 'GNX',
    duration: 177,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c764e52f55.mp3?filename=beat-hip-hop-instrumental-111583.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-8',
    title: 'tv off',
    artist: 'Kendrick Lamar',
    album: 'GNX',
    duration: 145,
    coverUrl: 'https://images.unsplash.com/photo-1520523839898-507125cd53c1?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=modern-hip-hop-116564.mp3',
    source: 'demo',
    liked: false,
  },
  {
    id: 'track-9',
    title: 'Out of Time',
    artist: 'The Weeknd',
    album: 'Dawn FM',
    duration: 194,
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=the-weekend-retro-pop-124036.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-10',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 200,
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/23/audio_4ec9fbcd0c.mp3?filename=cinematic-chillhop-118859.mp3',
    source: 'demo',
    liked: false,
  },
  {
    id: 'track-11',
    title: 'St. Chroma',
    artist: 'Tyler, The Creator',
    album: 'CHROMAKOPIA',
    duration: 197,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/04/27/audio_4627d3b145.mp3?filename=urban-trap-hip-hop-112543.mp3',
    source: 'demo',
    liked: true,
  },
  {
    id: 'track-12',
    title: 'Sticky',
    artist: 'Tyler, The Creator ft. GloRilla, Sexyy Red, Lil Wayne',
    album: 'CHROMAKOPIA',
    duration: 255,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c35272a275.mp3?filename=trap-beat-banger-118683.mp3',
    source: 'demo',
    liked: false,
  }
];

export const SEED_ALBUMS: Album[] = [
  {
    id: 'album-blonde',
    title: 'Blonde',
    artist: 'Frank Ocean',
    year: 2016,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tracks: SEED_TRACKS.filter(t => t.album === 'Blonde'),
  },
  {
    id: 'album-sos',
    title: 'SOS',
    artist: 'SZA',
    year: 2022,
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
    tracks: SEED_TRACKS.filter(t => t.album === 'SOS'),
  },
  {
    id: 'album-gnx',
    title: 'GNX',
    artist: 'Kendrick Lamar',
    year: 2024,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    tracks: SEED_TRACKS.filter(t => t.album === 'GNX'),
  },
  {
    id: 'album-chromakopia',
    title: 'CHROMAKOPIA',
    artist: 'Tyler, The Creator',
    year: 2024,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    tracks: SEED_TRACKS.filter(t => t.album === 'CHROMAKOPIA'),
  }
];

export const SEED_ARTISTS: Artist[] = [
  {
    id: 'artist-frank-ocean',
    name: 'Frank Ocean',
    monthlyListeners: '34,812,091',
    coverUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&auto=format&fit=crop&q=80',
    verified: true,
    bio: 'Singer, songwriter, and producer whose quiet records and acoustic soul reshaped modern music.',
    topTracks: SEED_TRACKS.filter(t => t.artist.includes('Frank Ocean')),
  },
  {
    id: 'artist-sza',
    name: 'SZA',
    monthlyListeners: '68,241,190',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    verified: true,
    bio: 'Grammy award-winning visionary of modern R&B, soul, and pop storytelling.',
    topTracks: SEED_TRACKS.filter(t => t.artist.includes('SZA')),
  },
  {
    id: 'artist-kendrick',
    name: 'Kendrick Lamar',
    monthlyListeners: '74,510,883',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    verified: true,
    bio: 'Pulitzer Prize-winning artist defining contemporary hip-hop lyricism and culture.',
    topTracks: SEED_TRACKS.filter(t => t.artist.includes('Kendrick')),
  }
];

export const SEED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-liked-songs',
    title: 'Liked Songs',
    description: 'Your favorite tracks in one personal collection.',
    coverUrl: '', // uses custom gradient heart icon
    tracks: SEED_TRACKS.filter(t => t.liked),
    isLikedSongs: true,
  },
  {
    id: 'playlist-discover-weekly',
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music. Updated every Monday.',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    tracks: [SEED_TRACKS[1], SEED_TRACKS[4], SEED_TRACKS[8], SEED_TRACKS[10]],
  },
  {
    id: 'playlist-daily-mix-1',
    title: 'Daily Mix 1',
    description: 'Frank Ocean, SZA, and Tyler, The Creator.',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tracks: [SEED_TRACKS[0], SEED_TRACKS[1], SEED_TRACKS[2], SEED_TRACKS[4]],
  },
  {
    id: 'playlist-rapcaviar',
    title: 'RapCaviar',
    description: 'New music from Kendrick Lamar, Doechii, GloRilla and more.',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    tracks: [SEED_TRACKS[6], SEED_TRACKS[7], SEED_TRACKS[11]],
  },
  {
    id: 'playlist-chill-vibes',
    title: 'Chill Vibes',
    description: 'Kick back to the calmest records of the season.',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    tracks: [SEED_TRACKS[2], SEED_TRACKS[5], SEED_TRACKS[8]],
  },
  {
    id: 'playlist-release-radar',
    title: 'Release Radar',
    description: 'Catch all the newest releases from artists you follow.',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    tracks: [SEED_TRACKS[6], SEED_TRACKS[10], SEED_TRACKS[11]],
  }
];

export const WRAPPED_2026_DATA: WrappedData = {
  year: 2026,
  minutesListened: 48220,
  topPercent: '0.5%',
  topArtist: {
    name: 'Frank Ocean',
    coverUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&auto=format&fit=crop&q=80',
    minutes: 9840,
    mostPlayedSong: 'Nights',
    plays: 142,
  },
  topTracks: [
    SEED_TRACKS[0], // Nights
    SEED_TRACKS[1], // Ivy
    SEED_TRACKS[4], // Kill Bill
    SEED_TRACKS[6], // Squabble Up
    SEED_TRACKS[8], // Out of Time
  ],
  topGenres: ['Alternative R&B', 'Hip Hop', 'Indie Soul', 'Contemporary Pop', 'Neo-Psychedelia'],
  soundPersonality: {
    title: 'The Luminary',
    description: 'You are drawn to warm, analog textures and introspective nocturnal songwriting that feels timeless.',
    auraColors: ['#1ED760', '#8D67AB'],
  }
};

export class MusicService {
  private static CUSTOM_PLAYLISTS_KEY = 'aningu_custom_playlists';

  public static getCustomPlaylists(): Playlist[] {
    try {
      const data = localStorage.getItem(this.CUSTOM_PLAYLISTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveCustomPlaylist(playlist: Playlist) {
    const playlists = this.getCustomPlaylists();
    const existingIdx = playlists.findIndex(p => p.id === playlist.id);
    if (existingIdx >= 0) {
      playlists[existingIdx] = playlist;
    } else {
      playlists.push(playlist);
    }
    localStorage.setItem(this.CUSTOM_PLAYLISTS_KEY, JSON.stringify(playlists));
  }

  public static getAllPlaylists(): Playlist[] {
    return [...SEED_PLAYLISTS, ...this.getCustomPlaylists()];
  }

  public static searchCatalog(query: string): {
    tracks: Track[];
    artists: Artist[];
    albums: Album[];
    playlists: Playlist[];
  } {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { tracks: [], artists: [], albums: [], playlists: [] };
    }

    const tracks = SEED_TRACKS.filter(
      t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q)
    );
    const artists = SEED_ARTISTS.filter(a => a.name.toLowerCase().includes(q));
    const albums = SEED_ALBUMS.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));
    const playlists = this.getAllPlaylists().filter(p => p.title.toLowerCase().includes(q));

    return { tracks, artists, albums, playlists };
  }

  // Keyless search integration via public Audius API
  public static async searchAudiusKeyless(query: string): Promise<Track[]> {
    if (!query.trim()) return [];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(query)}&app_name=aningu`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          return json.data.slice(0, 8).map((item: any) => ({
            id: `audius-${item.id}`,
            title: item.title,
            artist: item.user?.name || 'Unknown Artist',
            album: 'Audius Stream',
            duration: Math.round(item.duration || 180),
            coverUrl: item.artwork?.['480x480'] || item.artwork?.['150x150'] || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
            audioUrl: `https://discoveryprovider.audius.co/v1/tracks/${item.id}/stream?app_name=aningu`,
            source: 'audius' as const,
            liked: false,
          }));
        }
      }
    } catch {
      // Return empty if blocked or offline
    }
    return [];
  }
}

// Add createPlaylist method
export function createPlaylistHelper(title: string, description = 'Created on Aningu'): Playlist {
  const current = MusicService.getCustomPlaylists();
  const newPl: Playlist = {
    id: `playlist-custom-${Date.now()}`,
    title,
    description,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    tracks: [],
    isCustom: true,
  };
  MusicService.saveCustomPlaylist(newPl);
  return newPl;
}

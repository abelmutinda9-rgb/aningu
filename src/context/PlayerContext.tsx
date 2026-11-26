import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Track,
  Playlist,
  Album,
  LyricsData,
  ViewMode,
  DeviceView,
  AudioEngineSettings,
} from '../types';
import { DspEngine } from '../services/audio/dspEngine';
import { LyricsService } from '../services/lyrics/lyricsService';
import { SEED_TRACKS, MusicService, createPlaylistHelper } from '../services/music/musicService';

interface PlayerContextType {
  // Current track & queue
  currentTrack: Track | null;
  queue: Track[];
  history: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';

  // Playlists & Catalogs
  playlists: Playlist[];
  createPlaylist: (title: string, description?: string) => Playlist;

  // DSP & Audio engine settings
  isWarmthEnabled: boolean;
  isLufsNormalized: boolean;
  audioSettings: AudioEngineSettings;

  // Lyrics
  lyrics: LyricsData | null;
  isLoadingLyrics: boolean;
  isLyricsOpen: boolean;

  // View & Device Modes
  viewMode: ViewMode;
  deviceView: DeviceView;
  selectedPlaylist: Playlist | null;
  selectedAlbum: Album | null;
  likedTrackIds: Set<string>;

  // Actions
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleWarmth: () => void;
  toggleLufs: () => void;
  toggleLike: (trackId: string) => void;
  setIsLyricsOpen: (open: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceView: (view: DeviceView) => void;
  selectPlaylist: (playlist: Playlist) => void;
  selectAlbum: (album: Album) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(SEED_TRACKS[0]);
  const [queue, setQueue] = useState<Track[]>(SEED_TRACKS);
  const [history, setHistory] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SEED_TRACKS[0].duration || 0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');

  // Playlists state with localStorage persistence
  const [playlists, setPlaylists] = useState<Playlist[]>(() => MusicService.getAllPlaylists());

  // DSP
  const [isWarmthEnabled, setIsWarmthEnabled] = useState<boolean>(false);
  const [isLufsNormalized, setIsLufsNormalized] = useState<boolean>(true);

  // Lyrics
  const [lyrics, setLyrics] = useState<LyricsData | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState<boolean>(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  // Views & Likes
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('aningu_liked_tracks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['track-1', 'track-2', 'track-3']);
    } catch {
      return new Set(['track-1', 'track-2', 'track-3']);
    }
  });

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const dspEngineRef = useRef<DspEngine | null>(null);

  // Initialize Web Audio & DSP
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audioElementRef.current = audio;

    const dsp = new DspEngine();
    dspEngineRef.current = dsp;

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration || currentTrack?.duration || 0);
    });

    audio.addEventListener('ended', () => {
      handleTrackEnd();
    });

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleTrackEnd = () => {
    if (repeat === 'one') {
      if (audioElementRef.current) {
        audioElementRef.current.currentTime = 0;
        audioElementRef.current.play();
      }
    } else {
      nextTrack();
    }
  };

  // Fetch lyrics whenever current track changes
  useEffect(() => {
    if (!currentTrack) return;

    let isCancelled = false;
    setIsLoadingLyrics(true);

    LyricsService.fetchLyrics(currentTrack.title, currentTrack.artist, currentTrack.duration).then(data => {
      if (!isCancelled) {
        setLyrics(data);
        setIsLoadingLyrics(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentTrack]);

  // Handle track playback
  const playTrack = (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    if (newQueue) {
      setQueue(newQueue);
    }

    if (audioElementRef.current) {
      // Connect DSP on first user interaction
      if (dspEngineRef.current && !dspEngineRef.current.isInitialized()) {
        dspEngineRef.current.init(audioElementRef.current);
      }

      audioElementRef.current.src = track.audioUrl;
      audioElementRef.current.load();
      audioElementRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocks audio autoplay or source, state remains paused
          setIsPlaying(false);
        });
    }
  };

  const togglePlayPause = () => {
    if (!audioElementRef.current || !currentTrack) return;

    if (dspEngineRef.current && !dspEngineRef.current.isInitialized()) {
      dspEngineRef.current.init(audioElementRef.current);
    }

    if (isPlaying) {
      audioElementRef.current.pause();
    } else {
      if (!audioElementRef.current.src || audioElementRef.current.src === '') {
        audioElementRef.current.src = currentTrack.audioUrl;
      }
      audioElementRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seekTo = (time: number) => {
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);

    let nextIndex = 0;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (currentIndex >= 0 && currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (repeat === 'all') {
      nextIndex = 0;
    } else {
      return;
    }

    setHistory(prev => [currentTrack, ...prev]);
    playTrack(queue[nextIndex]);
  };

  const prevTrack = () => {
    if (currentTime > 3 && audioElementRef.current) {
      audioElementRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (history.length > 0) {
      const prev = history[0];
      setHistory(h => h.slice(1));
      playTrack(prev);
    } else if (currentTrack && queue.length > 0) {
      const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
      if (currentIndex > 0) {
        playTrack(queue[currentIndex - 1]);
      }
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    if (dspEngineRef.current) {
      dspEngineRef.current.setVolume(clamped);
    } else if (audioElementRef.current) {
      audioElementRef.current.volume = clamped;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      if (dspEngineRef.current) {
        dspEngineRef.current.setVolume(0);
      } else if (audioElementRef.current) {
        audioElementRef.current.volume = 0;
      }
    }
  };

  const toggleShuffle = () => setShuffle(s => !s);

  const toggleRepeat = () => {
    setRepeat(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleWarmth = () => {
    const nextVal = !isWarmthEnabled;
    setIsWarmthEnabled(nextVal);
    dspEngineRef.current?.setWarmthProfile(nextVal);
  };

  const toggleLufs = () => {
    const nextVal = !isLufsNormalized;
    setIsLufsNormalized(nextVal);
    dspEngineRef.current?.setLufsNormalization(nextVal);
  };

  const toggleLike = (trackId: string) => {
    setLikedTrackIds(prev => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      try {
        localStorage.setItem('aningu_liked_tracks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const createPlaylist = (title: string, description?: string) => {
    const created = createPlaylistHelper(title, description);
    setPlaylists(MusicService.getAllPlaylists());
    return created;
  };

  const selectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setViewMode('playlist');
  };

  const selectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setViewMode('album');
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        history,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        shuffle,
        repeat,
        playlists,
        createPlaylist,
        isWarmthEnabled,
        isLufsNormalized,
        audioSettings: {
          normalizationLufs: -14,
          isWarmthProfile: isWarmthEnabled,
          codec: 'opus',
          bitrateKbps: 320,
        },
        lyrics,
        isLoadingLyrics,
        isLyricsOpen,
        viewMode,
        deviceView,
        selectedPlaylist,
        selectedAlbum,
        likedTrackIds,
        playTrack,
        togglePlayPause,
        seekTo,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        toggleWarmth,
        toggleLufs,
        toggleLike,
        setIsLyricsOpen,
        setViewMode,
        setDeviceView,
        selectPlaylist,
        selectAlbum,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

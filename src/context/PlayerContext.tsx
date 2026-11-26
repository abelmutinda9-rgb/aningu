import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
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
import { DownloadService } from '../services/download/downloadService';

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

  // Queue actions
  addToQueue: (track: Track) => void;
  playNext: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  clearQueue: () => void;
  isQueueOpen: boolean;
  setIsQueueOpen: (open: boolean) => void;

  // Crossfade (0 - 12s)
  crossfadeDuration: number;
  setCrossfadeDuration: (sec: number) => void;

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

  // Download & Offline playback (Spotify style)
  downloadedTrackIds: Set<string>;
  downloadTrack: (track: Track) => Promise<void>;
  downloadPlaylistAction: (tracks: Track[]) => Promise<void>;
  isDownloadingPlaylist: boolean;
  playlistDownloadProgress: { completed: number; total: number; currentTitle: string } | null;

  // Multi-Device Download Modal
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;

  // Fullscreen
  isFullscreen: boolean;
  toggleFullscreen: () => void;

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
  const [queue, setQueue] = useState<Track[]>(SEED_TRACKS.slice(1));
  const [history, setHistory] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SEED_TRACKS[0].duration || 0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');

  // Crossfade & Modals
  const [crossfadeDuration, setCrossfadeDurationState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('aningu_crossfade');
      return saved !== null ? Number(saved) : 3;
    } catch {
      return 3;
    }
  });
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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

  // Offline / Download state
  const [downloadedTrackIds, setDownloadedTrackIds] = useState<Set<string>>(() =>
    DownloadService.getDownloadedTrackIds()
  );
  const [isDownloadingPlaylist, setIsDownloadingPlaylist] = useState<boolean>(false);
  const [playlistDownloadProgress, setPlaylistDownloadProgress] = useState<{
    completed: number;
    total: number;
    currentTitle: string;
  } | null>(null);

  useEffect(() => {
    const handleDownloadsUpdated = () => {
      setDownloadedTrackIds(DownloadService.getDownloadedTrackIds());
    };
    window.addEventListener('aningu-downloads-updated', handleDownloadsUpdated);
    return () => window.removeEventListener('aningu-downloads-updated', handleDownloadsUpdated);
  }, []);

  const downloadTrack = async (track: Track) => {
    await DownloadService.downloadTrackFile(track);
    setDownloadedTrackIds(DownloadService.getDownloadedTrackIds());
  };

  const downloadPlaylistAction = async (tracks: Track[]) => {
    setIsDownloadingPlaylist(true);
    setPlaylistDownloadProgress({ completed: 0, total: tracks.length, currentTitle: 'Starting...' });
    await DownloadService.downloadPlaylist(tracks, (completed, total, currentTitle) => {
      setPlaylistDownloadProgress({ completed, total, currentTitle });
    });
    setDownloadedTrackIds(DownloadService.getDownloadedTrackIds());
    setIsDownloadingPlaylist(false);
    setTimeout(() => setPlaylistDownloadProgress(null), 3000);
  };

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const dspEngineRef = useRef<DspEngine | null>(null);
  const isFadingRef = useRef<boolean>(false);

  const setCrossfadeDuration = (sec: number) => {
    const val = Math.max(0, Math.min(12, sec));
    setCrossfadeDurationState(val);
    try {
      localStorage.setItem('aningu_crossfade', String(val));
    } catch {}
  };

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize Web Audio & Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audioElementRef.current = audio;

    const dsp = new DspEngine();
    dspEngineRef.current = dsp;

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);

      // Check crossfade trigger towards the end of track
      if (
        crossfadeDuration > 0 &&
        audio.duration > crossfadeDuration * 2 &&
        audio.currentTime >= audio.duration - crossfadeDuration &&
        !isFadingRef.current
      ) {
        isFadingRef.current = true;
        const remaining = Math.max(0.1, audio.duration - audio.currentTime);
        fadeVolume(0, remaining);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration || currentTrack?.duration || 0);
      isFadingRef.current = false;
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
  }, [crossfadeDuration]);

  // Volume fade helper for crossfades
  const fadeVolume = (targetVol: number, seconds: number) => {
    if (!audioElementRef.current) return;
    const audio = audioElementRef.current;
    const startVol = audio.volume;
    const startTime = performance.now();
    const durationMs = seconds * 1000;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const current = startVol + (targetVol - startVol) * progress;
      if (dspEngineRef.current?.isInitialized()) {
        dspEngineRef.current.setVolume(current);
      } else {
        audio.volume = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // Web Media Session API
  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentTrack) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album || 'Aningu',
        artwork: [
          { src: currentTrack.coverUrl, sizes: '96x96', type: 'image/jpeg' },
          { src: currentTrack.coverUrl, sizes: '128x128', type: 'image/jpeg' },
          { src: currentTrack.coverUrl, sizes: '192x192', type: 'image/jpeg' },
          { src: currentTrack.coverUrl, sizes: '256x256', type: 'image/jpeg' },
          { src: currentTrack.coverUrl, sizes: '384x384', type: 'image/jpeg' },
          { src: currentTrack.coverUrl, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        togglePlayPause();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        togglePlayPause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        prevTrack();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        nextTrack();
      });
      navigator.mediaSession.setActionHandler('seekto', details => {
        if (details.seekTime !== undefined && details.seekTime !== null) {
          seekTo(details.seekTime);
        }
      });
    } catch {}
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  const handleTrackEnd = () => {
    if (repeat === 'one') {
      if (audioElementRef.current) {
        audioElementRef.current.currentTime = 0;
        audioElementRef.current.play().catch(() => {});
      }
    } else {
      nextTrack();
    }
  };

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

  const playTrack = (track: Track, newQueue?: Track[]) => {
    if (currentTrack) {
      setHistory(prev => [currentTrack, ...prev]);
    }

    setCurrentTrack(track);

    if (newQueue) {
      const trackIndex = newQueue.findIndex(t => t.id === track.id);
      if (trackIndex >= 0) {
        setQueue(newQueue.slice(trackIndex + 1));
      } else {
        setQueue(newQueue.filter(t => t.id !== track.id));
      }
    }

    if (audioElementRef.current) {
      if (dspEngineRef.current && !dspEngineRef.current.isInitialized()) {
        dspEngineRef.current.init(audioElementRef.current);
      }

      audioElementRef.current.src = track.audioUrl;
      audioElementRef.current.load();

      const targetVol = isMuted ? 0 : volume;
      if (crossfadeDuration > 0) {
        audioElementRef.current.volume = 0;
        audioElementRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeVolume(targetVol, Math.min(1.5, crossfadeDuration / 2));
          })
          .catch(() => setIsPlaying(false));
      } else {
        if (dspEngineRef.current?.isInitialized()) {
          dspEngineRef.current.setVolume(targetVol);
        } else {
          audioElementRef.current.volume = targetVol;
        }
        audioElementRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
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
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      playTrack(next);
      return;
    }

    if (repeat === 'all' && SEED_TRACKS.length > 0) {
      playTrack(SEED_TRACKS[0], SEED_TRACKS.slice(1));
    } else if (shuffle && SEED_TRACKS.length > 0) {
      const randomIndex = Math.floor(Math.random() * SEED_TRACKS.length);
      playTrack(SEED_TRACKS[randomIndex]);
    }
  };

  const prevTrack = () => {
    if (currentTime > 3 && audioElementRef.current) {
      audioElementRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (history.length > 0) {
      const [prev, ...rest] = history;
      setHistory(rest);
      if (currentTrack) {
        setQueue(q => [currentTrack, ...q]);
      }
      playTrack(prev);
    } else if (currentTrack) {
      audioElementRef.current && (audioElementRef.current.currentTime = 0);
      setCurrentTime(0);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
  };

  const playNext = (track: Track) => {
    setQueue(prev => [track, ...prev]);
  };

  const removeFromQueue = (index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
  };

  const reorderQueue = (startIndex: number, endIndex: number) => {
    setQueue(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    if (dspEngineRef.current?.isInitialized()) {
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
      if (dspEngineRef.current?.isInitialized()) {
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
        addToQueue,
        playNext,
        removeFromQueue,
        reorderQueue,
        clearQueue,
        isQueueOpen,
        setIsQueueOpen,
        crossfadeDuration,
        setCrossfadeDuration,
        playlists,
        createPlaylist,
        isWarmthEnabled,
        isLufsNormalized,
        audioSettings: {
          normalizationLufs: -14,
          isWarmthProfile: isWarmthEnabled,
          codec: 'opus',
          bitrateKbps: 320,
          crossfadeDuration,
        },
        lyrics,
        isLoadingLyrics,
        isLyricsOpen,
        viewMode,
        deviceView,
        selectedPlaylist,
        selectedAlbum,
        likedTrackIds,
        downloadedTrackIds,
        downloadTrack,
        downloadPlaylistAction,
        isDownloadingPlaylist,
        playlistDownloadProgress,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        isFullscreen,
        toggleFullscreen,
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

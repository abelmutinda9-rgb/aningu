import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Volume2,
  VolumeX,
  Mic2,
  Tv,
  Maximize2,
  Sliders,
  Check,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const PlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    isWarmthEnabled,
    isLufsNormalized,
    likedTrackIds,
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
    isLyricsOpen,
    setDeviceView,
    deviceView,
  } = usePlayer();

  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [isDspMenuOpen, setIsDspMenuOpen] = useState(false);

  if (!currentTrack) return null;

  const isLiked = likedTrackIds.has(currentTrack.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="h-20 sm:h-[90px] bg-[#121212] border-t border-[#242424] px-4 flex items-center justify-between text-white select-none z-40 relative">
      {/* Left: Track Information */}
      <div className="flex items-center gap-3 w-1/4 min-w-[180px] max-w-[300px]">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover shadow-sm shrink-0"
        />
        <div className="min-w-0 pr-1">
          <p className="text-sm font-semibold truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </p>
          <p className="text-xs text-[#a7a7a7] truncate hover:text-white cursor-pointer">
            {currentTrack.artist}
          </p>
        </div>
        <button
          onClick={() => toggleLike(currentTrack.id)}
          className={`shrink-0 ml-1 hover:scale-110 transition-transform ${
            isLiked ? 'text-[#1ED760]' : 'text-[#a7a7a7] hover:text-white'
          }`}
          title={isLiked ? 'Remove from Your Library' : 'Save to Your Library'}
        >
          <Heart size={18} fill={isLiked ? '#1ED760' : 'none'} />
        </button>
      </div>

      {/* Center: Playback Controls & Scrubber */}
      <div className="flex-1 max-w-[640px] flex flex-col items-center gap-1.5 px-4">
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            onClick={toggleShuffle}
            className={`transition-colors ${
              shuffle ? 'text-[#1ED760]' : 'text-[#a7a7a7] hover:text-white'
            }`}
            title="Enable shuffle"
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={prevTrack}
            className="text-[#a7a7a7] hover:text-white transition-colors"
            title="Previous"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-white/90 hover:scale-105 active:scale-95 text-black grid place-items-center transition-all shadow-md"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="text-[#a7a7a7] hover:text-white transition-colors"
            title="Next"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`transition-colors ${
              repeat !== 'off' ? 'text-[#1ED760]' : 'text-[#a7a7a7] hover:text-white'
            }`}
            title="Repeat mode"
          >
            {repeat === 'one' ? <Repeat1 size={16} /> : <Repeat size={16} />}
          </button>
        </div>

        {/* Scrubber bar */}
        <div className="w-full flex items-center gap-2 text-[11px] text-[#a7a7a7] tabular-nums">
          <span className="w-9 text-right">{formatTime(currentTime)}</span>
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              seekTo(pos * duration);
            }}
            className="flex-1 h-1 bg-[#242424] hover:h-1.5 rounded-full relative cursor-pointer group transition-all"
          >
            <div
              className="h-full bg-white group-hover:bg-[#1ED760] rounded-full relative transition-colors"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="w-9 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Audio Features, Devices, Volume */}
      <div className="hidden md:flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        {/* Lyrics Toggle */}
        <button
          onClick={() => setIsLyricsOpen(!isLyricsOpen)}
          className={`p-2 rounded-full transition-colors ${
            isLyricsOpen
              ? 'text-[#1ED760] bg-white/10'
              : 'text-[#a7a7a7] hover:text-white'
          }`}
          title="Lyrics"
        >
          <Mic2 size={18} />
        </button>

        {/* DSP Audio Settings Button */}
        <div className="relative">
          <button
            onClick={() => setIsDspMenuOpen(o => !o)}
            className={`p-2 rounded-full transition-colors ${
              isWarmthEnabled || isLufsNormalized
                ? 'text-[#1ED760] bg-[#1ED760]/10'
                : 'text-[#a7a7a7] hover:text-white'
            }`}
            title="Audio Quality & DSP Settings"
          >
            <Sliders size={18} />
          </button>

          {isDspMenuOpen && (
            <div className="absolute bottom-12 right-0 w-64 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3 shadow-2xl z-50 text-xs">
              <div className="font-bold text-white mb-2 flex items-center justify-between">
                <span>Audio Engine DSP</span>
                <span className="text-[10px] text-[#1ED760] font-mono">ITU-R BS.1770</span>
              </div>

              {/* -14 LUFS Normalization */}
              <div
                onClick={toggleLufs}
                className="flex items-center justify-between p-2 rounded hover:bg-[#2a2a2a] cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-white">-14 LUFS Normalization</div>
                  <div className="text-[#a7a7a7] text-[10px]">Unified Spotify broadcast standard</div>
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${
                    isLufsNormalized ? 'bg-[#1ED760] text-black' : 'border border-[#a7a7a7]'
                  }`}
                >
                  {isLufsNormalized && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              {/* Warmth DSP Filter */}
              <div
                onClick={toggleWarmth}
                className="flex items-center justify-between p-2 rounded hover:bg-[#2a2a2a] cursor-pointer mt-1"
              >
                <div>
                  <div className="font-semibold text-white">Analog Warmth Filter</div>
                  <div className="text-[#a7a7a7] text-[10px]">220Hz low-shelf + contouring</div>
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${
                    isWarmthEnabled ? 'bg-[#1ED760] text-black' : 'border border-[#a7a7a7]'
                  }`}
                >
                  {isWarmthEnabled && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Device View Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsDeviceMenuOpen(o => !o)}
            className="p-2 text-[#a7a7a7] hover:text-white transition-colors"
            title="Connect to a device"
          >
            <Tv size={18} />
          </button>

          {isDeviceMenuOpen && (
            <div className="absolute bottom-12 right-0 w-52 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-2 shadow-2xl z-50 text-xs">
              <div className="font-bold text-white px-2 py-1.5 border-b border-[#2a2a2a] mb-1">
                Display Mode
              </div>
              <button
                onClick={() => {
                  setDeviceView('desktop');
                  setIsDeviceMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                  deviceView === 'desktop' ? 'text-[#1ED760] bg-[#2a2a2a]' : 'text-white hover:bg-[#2a2a2a]'
                }`}
              >
                <span>Desktop Workstation</span>
                {deviceView === 'desktop' && <Check size={14} />}
              </button>
              <button
                onClick={() => {
                  setDeviceView('mobile');
                  setIsDeviceMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                  deviceView === 'mobile' ? 'text-[#1ED760] bg-[#2a2a2a]' : 'text-white hover:bg-[#2a2a2a]'
                }`}
              >
                <span>Mobile Device</span>
                {deviceView === 'mobile' && <Check size={14} />}
              </button>
              <button
                onClick={() => {
                  setDeviceView('tv');
                  setIsDeviceMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                  deviceView === 'tv' ? 'text-[#1ED760] bg-[#2a2a2a]' : 'text-white hover:bg-[#2a2a2a]'
                }`}
              >
                <span>TV 10-Foot Mode</span>
                {deviceView === 'tv' && <Check size={14} />}
              </button>
            </div>
          )}
        </div>

        {/* Volume Scrubber */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-[#a7a7a7] hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const val = (e.clientX - rect.left) / rect.width;
              setVolume(val);
            }}
            className="w-20 sm:w-24 h-1 bg-[#242424] hover:h-1.5 rounded-full relative cursor-pointer group transition-all"
          >
            <div
              className="h-full bg-white group-hover:bg-[#1ED760] rounded-full relative"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

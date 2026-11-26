import React, { useEffect, useRef } from 'react';
import { X, Mic2, Heart, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const FullScreenLyrics: React.FC = () => {
  const {
    currentTrack,
    currentTime,
    lyrics,
    isLyricsOpen,
    setIsLyricsOpen,
    seekTo,
    isPlaying,
    togglePlayPause,
    nextTrack,
    prevTrack,
    likedTrackIds,
    toggleLike,
  } = usePlayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLParagraphElement>(null);

  // Auto-scroll to keep active line centered
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  if (!isLyricsOpen || !currentTrack) return null;

  const isLiked = likedTrackIds.has(currentTrack.id);

  // Determine active lyric index
  let activeIndex = -1;
  if (lyrics?.lines && lyrics.lines.length > 0) {
    for (let i = 0; i < lyrics.lines.length; i++) {
      if (currentTime >= lyrics.lines[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col justify-between overflow-hidden select-none font-['Figtree'] animate-in fade-in duration-300">
      {/* Dynamic gradient backdrop based on album artwork */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b11] via-[#1a1310] to-[#121212] opacity-90 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-md object-cover shadow-md"
          />
          <div className="min-w-0">
            <h2 className="text-white text-base font-bold truncate leading-snug">
              {currentTrack.title}
            </h2>
            <p className="text-[#a7a7a7] text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5">
            <Mic2 size={13} className="text-[#1ED760]" />
            {lyrics?.source || 'Live Sync'}
          </span>
          <button
            onClick={() => setIsLyricsOpen(false)}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Lyrics Scrollable Container */}
      <div
        ref={containerRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-16 py-12 custom-scrollbar flex flex-col gap-6"
      >
        {lyrics && lyrics.lines.length > 0 ? (
          lyrics.lines.map((line, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx < activeIndex;

            return (
              <p
                key={idx}
                ref={isActive ? activeLineRef : null}
                onClick={() => seekTo(line.time)}
                className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white scale-102 origin-left drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]'
                    : isPassed
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-white/25 hover:text-white/50'
                }`}
              >
                {line.text}
              </p>
            );
          })
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Mic2 size={48} className="text-[#a7a7a7] mb-4 opacity-50" />
            <p className="text-xl font-bold text-white mb-1">Looking for lyrics...</p>
            <p className="text-sm text-[#a7a7a7]">Searching LRCLIB & Aningu sources</p>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Strip */}
      <div className="relative z-10 px-6 py-4 bg-[#181818]/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
        <button
          onClick={() => toggleLike(currentTrack.id)}
          className={`w-10 h-10 grid place-items-center rounded-full hover:bg-white/10 transition-colors ${
            isLiked ? 'text-[#1ED760]' : 'text-[#a7a7a7]'
          }`}
        >
          <Heart size={20} fill={isLiked ? '#1ED760' : 'none'} />
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={prevTrack}
            className="w-10 h-10 grid place-items-center text-[#a7a7a7] hover:text-white transition-colors"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] grid place-items-center text-black transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="w-10 h-10 grid place-items-center text-[#a7a7a7] hover:text-white transition-colors"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>
        </div>

        <div className="text-xs text-[#a7a7a7] font-semibold tabular-nums">
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Share2, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { WRAPPED_2026_DATA } from '../../services/music/musicService';

interface WrappedStoryProps {
  onClose: () => void;
}

export const WrappedStory: React.FC<WrappedStoryProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { playTrack } = usePlayer();
  const totalSlides = 5;

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev < totalSlides - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col justify-between overflow-hidden select-none font-['Figtree']">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#1ED760]/15 blur-3xl pointer-events-none" />

      {/* Top Header & Progress bars */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        {/* Progress indicators */}
        <div className="flex gap-1.5 h-1">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div key={i} className="flex-1 bg-white/20 rounded-full overflow-hidden h-full">
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  i < currentSlide
                    ? 'w-full'
                    : i === currentSlide
                    ? 'w-full'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1ED760] grid place-items-center text-black font-extrabold text-xs">
              a
            </div>
            <span className="text-white text-sm font-bold tracking-tight">
              Aningu 2026 Wrapped
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white"
            >
              {isPaused ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Center Slide Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 max-w-lg mx-auto w-full">
        {/* Slide 0: Intro */}
        {currentSlide === 0 && (
          <div className="animate-in fade-in duration-500">
            <div className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-2">
              Your Year in Sound
            </div>
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-4">
              2026<br />
              <span className="text-outline-green">WRAPPED</span>
            </h1>
            <p className="text-[#a7a7a7] text-lg font-medium leading-relaxed">
              Every late night, commute, and quiet thought had a soundtrack. Here is how you listened on Aningu this year.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-[#1ED760] text-black text-sm font-extrabold">
                {WRAPPED_2026_DATA.minutesListened.toLocaleString()} Minutes
              </span>
              <span className="px-4 py-2 rounded-full bg-[#242424] text-white text-sm font-semibold">
                Top {WRAPPED_2026_DATA.topPercent} Globally
              </span>
            </div>
          </div>
        )}

        {/* Slide 1: Listening Minutes */}
        {currentSlide === 1 && (
          <div className="animate-in fade-in duration-500">
            <div className="text-xs font-bold uppercase tracking-widest text-[#a7a7a7] mb-2">
              Total Listening Time
            </div>
            <div className="text-7xl sm:text-8xl font-black text-white tracking-tighter leading-none my-2">
              48,220
            </div>
            <div className="text-2xl font-extrabold text-[#1ED760] mb-6">
              Minutes on repeat
            </div>
            <div className="p-4 rounded-xl bg-[#181818] border border-[#242424]">
              <p className="text-white text-base font-semibold">
                That's more listening than <span className="text-[#1ED760] font-bold">99.5%</span> of all music fans worldwide.
              </p>
              <p className="mt-2 text-[#a7a7a7] text-xs">
                Your peak day was October 14, when you spent 512 minutes lost in Frank Ocean & SZA.
              </p>
            </div>
          </div>
        )}

        {/* Slide 2: Top Artist */}
        {currentSlide === 2 && (
          <div className="animate-in fade-in duration-500">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1ED760] mb-2">
              #1 Artist on your year
            </div>
            <div className="flex items-center gap-5 my-4">
              <div className="w-32 h-32 rounded-full p-1 bg-[#1ED760] shadow-[0_0_40px_rgba(30,215,96,0.4)] shrink-0">
                <img
                  src={WRAPPED_2026_DATA.topArtist.coverUrl}
                  alt={WRAPPED_2026_DATA.topArtist.name}
                  className="w-full h-full object-cover rounded-full grayscale border-2 border-black"
                />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-white leading-tight">
                  {WRAPPED_2026_DATA.topArtist.name}
                </h2>
                <p className="text-[#a7a7a7] text-sm mt-1">
                  {WRAPPED_2026_DATA.topArtist.minutes.toLocaleString()} minutes listened
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#181818] border border-[#242424]">
                <div>
                  <div className="text-xs text-[#a7a7a7] uppercase font-bold">Most played track</div>
                  <div className="text-base font-bold text-white">{WRAPPED_2026_DATA.topArtist.mostPlayedSong}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-[#1ED760]">{WRAPPED_2026_DATA.topArtist.plays}</div>
                  <div className="text-[11px] text-[#a7a7a7]">plays</div>
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1.5 h-10 px-2 py-1 bg-[#181818] rounded-lg">
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-1" />
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-2" />
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-3" />
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-4" />
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-2" />
                <div className="flex-1 bg-[#1ED760] rounded-full h-full animate-eq-1" />
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Top 5 Tracks */}
        {currentSlide === 3 && (
          <div className="animate-in fade-in duration-500">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1ED760] mb-2">
              Your Top 5 Songs
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              The soundtrack of 2026
            </h2>
            <div className="space-y-2">
              {WRAPPED_2026_DATA.topTracks.map((track, idx) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-[#181818] hover:bg-[#242424] cursor-pointer transition-colors border border-transparent hover:border-[#1ED760]/30"
                >
                  <span className={`w-5 text-center font-extrabold text-base ${idx === 0 ? 'text-[#1ED760]' : 'text-[#a7a7a7]'}`}>
                    {idx + 1}
                  </span>
                  <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{track.title}</div>
                    <div className="text-xs text-[#a7a7a7] truncate">{track.artist}</div>
                  </div>
                  <Play size={16} className="text-[#1ED760] opacity-80" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 4: Audio Personality & Summary */}
        {currentSlide === 4 && (
          <div className="animate-in fade-in duration-500 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1ED760] mb-1">
              Your Sound Personality
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
              {WRAPPED_2026_DATA.soundPersonality.title}
            </h2>
            <p className="text-[#d0d0d0] text-sm leading-relaxed max-w-sm mx-auto mb-6">
              {WRAPPED_2026_DATA.soundPersonality.description}
            </p>

            {/* Aura gradient card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1ED760]/30 via-[#8D67AB]/30 to-[#121212] border border-[#242424] text-left">
              <div className="text-xs font-bold text-[#a7a7a7] uppercase">Top Genres</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {WRAPPED_2026_DATA.topGenres.map(g => (
                  <span key={g} className="px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Share CTA */}
            <button
              onClick={() => {
                alert('Aningu Wrapped story copied to clipboard!');
              }}
              className="mt-6 w-full h-14 rounded-full bg-[#1ED760] text-black font-extrabold text-base flex items-center justify-center gap-2 hover:bg-[#1fdf64] transition-all shadow-[0_4px_20px_rgba(30,215,96,0.3)]"
            >
              <Share2 size={18} />
              Share Your 2026 Story
            </button>
          </div>
        )}
      </div>

      {/* Navigation click zones & controls */}
      <div className="relative z-10 px-6 py-4 flex items-center justify-between border-t border-[#181818]">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
            currentSlide === 0 ? 'text-transparent' : 'text-[#a7a7a7] hover:text-white'
          }`}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span className="text-xs text-[#a7a7a7] font-semibold">
          {currentSlide + 1} of {totalSlides}
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white hover:text-[#1ED760]"
        >
          {currentSlide === totalSlides - 1 ? 'Done' : 'Next'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

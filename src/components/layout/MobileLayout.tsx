import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  Play,
  Pause,
  Heart,
  Mic2,
  Tv,
  Monitor,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { HomeView } from '../views/HomeView';
import { SearchView } from '../views/SearchView';
import { LibraryView } from '../views/LibraryView';
import { PlaylistDetailView } from '../views/PlaylistDetailView';
import { AlbumDetailView } from '../views/AlbumDetailView';
import { FullScreenLyrics } from '../player/FullScreenLyrics';
import { WrappedStory } from '../wrapped/WrappedStory';

export const MobileLayout: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    setIsLyricsOpen,
    likedTrackIds,
    toggleLike,
    setDeviceView,
  } = usePlayer();

  const isLiked = currentTrack ? likedTrackIds.has(currentTrack.id) : false;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#121212] text-white font-['Figtree'] overflow-hidden select-none">
      {/* Top Device switcher bar (handy for testing responsive TV/Desktop on any screen) */}
      <div className="bg-[#181818] border-b border-[#242424] px-4 py-1.5 flex items-center justify-between text-xs text-[#a7a7a7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
          <span className="font-bold text-white">Aningu Mobile</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceView('desktop')}
            className="hover:text-white flex items-center gap-1"
          >
            <Monitor size={13} /> Desktop
          </button>
          <span>•</span>
          <button
            onClick={() => setDeviceView('tv')}
            className="hover:text-white flex items-center gap-1"
          >
            <Tv size={13} /> TV Mode
          </button>
        </div>
      </div>

      {/* Main Content View Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {viewMode === 'home' && <HomeView />}
        {viewMode === 'search' && <SearchView />}
        {viewMode === 'library' && <LibraryView />}
        {viewMode === 'playlist' && <PlaylistDetailView />}
        {viewMode === 'album' && <AlbumDetailView />}
      </div>

      {/* Floating Mini Player (Sticky above bottom tabs) */}
      {currentTrack && (
        <div className="px-2 pb-1 z-30">
          <div
            onClick={() => setIsLyricsOpen(true)}
            className="h-14 bg-[#242424] rounded-lg p-2 flex items-center justify-between shadow-xl cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-10 h-10 rounded object-cover shrink-0 shadow"
              />
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-white truncate">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-[#a7a7a7] truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsLyricsOpen(true);
                }}
                className="p-1.5 text-[#a7a7a7] hover:text-[#1ED760]"
              >
                <Mic2 size={18} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleLike(currentTrack.id);
                }}
                className={`p-1.5 ${isLiked ? 'text-[#1ED760]' : 'text-[#a7a7a7]'}`}
              >
                <Heart size={18} fill={isLiked ? '#1ED760' : 'none'} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="w-9 h-9 rounded-full bg-white text-black grid place-items-center active:scale-95"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Progress Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#333]">
              <div
                className="h-full bg-[#1ED760]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spotify Navigation Bar */}
      <nav className="h-14 bg-[#121212]/95 backdrop-blur-md border-t border-[#242424] flex items-center justify-around text-[#a7a7a7] z-40">
        <button
          onClick={() => setViewMode('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            viewMode === 'home' ? 'text-white' : 'hover:text-white'
          }`}
        >
          <Home size={20} />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button
          onClick={() => setViewMode('search')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            viewMode === 'search' ? 'text-white' : 'hover:text-white'
          }`}
        >
          <Search size={20} />
          <span className="text-[10px] font-semibold">Search</span>
        </button>

        <button
          onClick={() => setViewMode('library')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            viewMode === 'library' ? 'text-white' : 'hover:text-white'
          }`}
        >
          <Library size={20} />
          <span className="text-[10px] font-semibold">Your Library</span>
        </button>
      </nav>

      {/* Fullscreen Lyrics Overlay */}
      <FullScreenLyrics />

      {/* Wrapped Interactive Story Overlay */}
      {viewMode === 'wrapped' && (
        <WrappedStory onClose={() => setViewMode('home')} />
      )}
    </div>
  );
};

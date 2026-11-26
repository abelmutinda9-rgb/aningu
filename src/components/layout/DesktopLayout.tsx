import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Music,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { PlayerBar } from '../player/PlayerBar';
import { FullScreenLyrics } from '../player/FullScreenLyrics';
import { WrappedStory } from '../wrapped/WrappedStory';
import { usePlayer } from '../../context/PlayerContext';
import { HomeView } from '../views/HomeView';
import { SearchView } from '../views/SearchView';
import { LibraryView } from '../views/LibraryView';
import { PlaylistDetailView } from '../views/PlaylistDetailView';
import { AlbumDetailView } from '../views/AlbumDetailView';

export const DesktopLayout: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentTrack,
    playlists,
    selectPlaylist,
    createPlaylist,
    likedTrackIds,
  } = usePlayer();

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white font-['Figtree'] overflow-hidden select-none">
      {/* 3-Column Workstation Main Area */}
      <div className="flex-1 flex gap-2 p-2 min-h-0">
        {/* Left Column: Navigation & Library Sidebar */}
        <aside className="w-64 lg:w-72 flex flex-col gap-2 shrink-0">
          {/* Top Nav Card */}
          <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4">
            <BrandLogo size="md" />

            <nav className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => setViewMode('home')}
                className={`flex items-center gap-4 text-sm font-bold transition-colors ${
                  viewMode === 'home'
                    ? 'text-white'
                    : 'text-[#a7a7a7] hover:text-white'
                }`}
              >
                <Home size={22} />
                <span>Home</span>
              </button>

              <button
                onClick={() => setViewMode('search')}
                className={`flex items-center gap-4 text-sm font-bold transition-colors ${
                  viewMode === 'search'
                    ? 'text-white'
                    : 'text-[#a7a7a7] hover:text-white'
                }`}
              >
                <Search size={22} />
                <span>Search</span>
              </button>
            </nav>
          </div>

          {/* Library Sidebar Card */}
          <div className="flex-1 bg-[#121212] rounded-lg p-3 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-2 py-2">
              <button
                onClick={() => setViewMode('library')}
                className="flex items-center gap-3 text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors"
              >
                <Library size={22} />
                <span>Your Library</span>
              </button>

              <button
                onClick={() => {
                  const name = prompt('Name your new playlist:');
                  if (name && name.trim()) {
                    createPlaylist(name.trim(), 'Created on Aningu');
                  }
                }}
                className="p-1.5 rounded-full hover:bg-[#242424] text-[#a7a7a7] hover:text-white"
                title="Create playlist or folder"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Playlists quick list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar mt-2 space-y-1">
              {playlists.map(pl => (
                <div
                  key={pl.id}
                  onClick={() => selectPlaylist(pl)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] cursor-pointer group transition-colors"
                >
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-[#242424]">
                    {pl.isLikedSongs ? (
                      <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#4b2fd6] to-[#9fb8c9]">
                        <Heart size={18} fill="#fff" className="text-white" />
                      </div>
                    ) : (
                      <img
                        src={pl.coverUrl}
                        alt={pl.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {pl.title}
                    </p>
                    <p className="text-[11px] text-[#a7a7a7] truncate">
                      Playlist • {pl.isLikedSongs ? `${likedTrackIds.size} songs` : `${pl.tracks.length} songs`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Column: Scrollable Content Container */}
        <main className="flex-1 bg-[#121212] rounded-lg flex flex-col min-h-0 overflow-hidden relative">
          {/* Header Bar */}
          <header className="h-16 px-6 bg-[#121212]/95 backdrop-blur-md flex items-center justify-between border-b border-white/5 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-[#a7a7a7] hover:text-white grid place-items-center"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => window.history.forward()}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-[#a7a7a7] hover:text-white grid place-items-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('wrapped')}
                className="px-3 py-1.5 rounded-full bg-[#1ED760]/15 hover:bg-[#1ED760]/25 text-[#1ED760] text-xs font-extrabold flex items-center gap-1.5 transition-colors border border-[#1ED760]/30"
              >
                <Sparkles size={13} />
                2026 Wrapped
              </button>

              <div className="w-8 h-8 rounded-full bg-[#242424] hover:scale-105 cursor-pointer grid place-items-center text-xs font-bold text-white border border-white/10">
                A
              </div>
            </div>
          </header>

          {/* Main View Display Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {viewMode === 'home' && <HomeView />}
            {viewMode === 'search' && <SearchView />}
            {viewMode === 'library' && <LibraryView />}
            {viewMode === 'playlist' && <PlaylistDetailView />}
            {viewMode === 'album' && <AlbumDetailView />}
          </div>
        </main>

        {/* Right Column: Now Playing Inspector Panel */}
        {isRightPanelOpen && currentTrack && (
          <aside className="w-72 lg:w-80 bg-[#121212] rounded-lg p-4 flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-2 border-b border-[#242424]">
              <span className="text-sm font-bold text-white">Now Playing</span>
              <button
                onClick={() => setIsRightPanelOpen(false)}
                className="text-xs text-[#a7a7a7] hover:text-white"
              >
                Hide
              </button>
            </div>

            {/* Big Track Artwork */}
            <div className="rounded-lg overflow-hidden shadow-xl aspect-square">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Track Info */}
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-[#a7a7a7]">{currentTrack.artist}</p>
            </div>

            {/* About the Artist Card */}
            <div className="rounded-xl bg-[#181818] p-4 border border-[#242424] space-y-2">
              <div className="text-xs uppercase font-extrabold text-[#a7a7a7]">
                About the artist
              </div>
              <p className="text-sm font-bold text-white">{currentTrack.artist}</p>
              <p className="text-xs text-[#a7a7a7] leading-relaxed">
                Streamed on Aningu High-Fidelity Audio Engine. Keyless stream pipeline with synchronized lyrics.
              </p>
            </div>

            {/* Audio Engine Info */}
            <div className="rounded-xl bg-[#181818] p-4 border border-[#242424] space-y-2">
              <div className="text-xs uppercase font-extrabold text-[#a7a7a7]">
                Audio Engine
              </div>
              <div className="text-xs text-[#1ED760] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-ping" />
                Opus -14 LUFS Broadcast Chain
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Sticky Player Deck */}
      <PlayerBar />

      {/* Fullscreen Lyrics Overlay (when active) */}
      <FullScreenLyrics />

      {/* Wrapped Interactive Story Overlay (when active) */}
      {viewMode === 'wrapped' && (
        <WrappedStory onClose={() => setViewMode('home')} />
      )}
    </div>
  );
};

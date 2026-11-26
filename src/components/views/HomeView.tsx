import React, { useState } from 'react';
import { Play, Sparkles, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { SEED_PLAYLISTS, SEED_TRACKS, SEED_ALBUMS } from '../../services/music/musicService';

export const HomeView: React.FC = () => {
  const { playTrack, selectPlaylist, selectAlbum, setViewMode } = usePlayer();
  const [filter, setFilter] = useState<'all' | 'music' | 'podcasts'>('all');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 font-['Figtree'] pb-24">
      {/* Time Greeting & Filter Chips */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {getGreeting()}
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#1ED760] text-black font-bold'
                : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('music')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              filter === 'music'
                ? 'bg-[#1ED760] text-black font-bold'
                : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
            }`}
          >
            Music
          </button>
          <button
            onClick={() => setFilter('podcasts')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              filter === 'podcasts'
                ? 'bg-[#1ED760] text-black font-bold'
                : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
            }`}
          >
            Podcasts
          </button>
        </div>
      </div>

      {/* 2026 Wrapped Interactive Banner */}
      <div
        onClick={() => setViewMode('wrapped')}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#181818] via-[#1a2e21] to-[#144824] p-5 sm:p-6 border border-[#1ED760]/30 shadow-lg cursor-pointer group hover:border-[#1ED760] transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1ED760]/20 text-[#1ED760] text-xs font-extrabold">
              <Sparkles size={13} />
              2026 WRAPPED IS HERE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              See what made your year unforgettable.
            </h2>
            <p className="text-sm text-[#d0d0d0]">
              48,220 minutes, Frank Ocean on repeat, and your custom Audio Aura.
            </p>
          </div>

          <button className="hidden sm:flex px-6 py-3 rounded-full bg-[#1ED760] group-hover:bg-[#1fdf64] text-black font-extrabold text-sm items-center gap-2 shadow-md transition-all">
            <Play size={16} fill="currentColor" />
            Launch Wrapped
          </button>
        </div>
      </div>

      {/* Quick Access 6-Pack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {SEED_PLAYLISTS.slice(0, 6).map(playlist => {
          return (
            <div
              key={playlist.id}
              onClick={() => selectPlaylist(playlist)}
              className="flex items-center gap-3 bg-[#242424]/80 hover:bg-[#2a2a2a] rounded-md overflow-hidden h-14 sm:h-16 cursor-pointer group transition-all"
            >
              {playlist.isLikedSongs ? (
                <div className="w-14 sm:w-16 h-full grid place-items-center bg-gradient-to-br from-[#4b2fd6] to-[#9fb8c9] shrink-0">
                  <Heart size={20} fill="#fff" className="text-white" />
                </div>
              ) : (
                <img
                  src={playlist.coverUrl}
                  alt={playlist.title}
                  className="w-14 sm:w-16 h-full object-cover shrink-0"
                />
              )}
              <span className="text-sm font-bold text-white truncate flex-1">
                {playlist.title}
              </span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  if (playlist.tracks.length > 0) {
                    playTrack(playlist.tracks[0], playlist.tracks);
                  }
                }}
                className="w-10 h-10 rounded-full bg-[#1ED760] text-black grid place-items-center mr-3 opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-105 shrink-0"
              >
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Made For You Shelf */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Made For You
          </h2>
          <span className="text-xs font-bold text-[#a7a7a7] hover:text-white cursor-pointer uppercase">
            Show all
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {SEED_PLAYLISTS.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => selectPlaylist(playlist)}
              className="w-36 sm:w-44 p-3 bg-[#181818] hover:bg-[#242424] rounded-md cursor-pointer transition-all shrink-0 group"
            >
              <div className="relative aspect-square w-full rounded-md overflow-hidden mb-3 bg-[#242424]">
                {playlist.isLikedSongs ? (
                  <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#4b2fd6] to-[#9fb8c9]">
                    <Heart size={36} fill="#fff" className="text-white" />
                  </div>
                ) : (
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (playlist.tracks.length > 0) {
                      playTrack(playlist.tracks[0], playlist.tracks);
                    }
                  }}
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#1ED760] text-black grid place-items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all shadow-lg hover:scale-105"
                >
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>
              </div>

              <h3 className="text-sm font-bold text-white truncate">
                {playlist.title}
              </h3>
              <p className="text-xs text-[#a7a7a7] line-clamp-2 mt-1">
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Albums */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Trending Albums
        </h2>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {SEED_ALBUMS.map(album => (
            <div
              key={album.id}
              onClick={() => selectAlbum(album)}
              className="w-36 sm:w-44 p-3 bg-[#181818] hover:bg-[#242424] rounded-md cursor-pointer transition-all shrink-0 group"
            >
              <div className="relative aspect-square w-full rounded-md overflow-hidden mb-3">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (album.tracks.length > 0) {
                      playTrack(album.tracks[0], album.tracks);
                    }
                  }}
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#1ED760] text-black grid place-items-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
                >
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>
              </div>

              <h3 className="text-sm font-bold text-white truncate">
                {album.title}
              </h3>
              <p className="text-xs text-[#a7a7a7] mt-1">
                {album.artist} • {album.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played Tracks */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Jump Back In
        </h2>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {SEED_TRACKS.slice(0, 8).map(track => (
            <div
              key={track.id}
              onClick={() => playTrack(track, SEED_TRACKS)}
              className="w-36 sm:w-40 p-3 bg-[#181818] hover:bg-[#242424] rounded-md cursor-pointer transition-all shrink-0 group"
            >
              <div className="relative aspect-square w-full rounded-md overflow-hidden mb-2">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#1ED760] text-black grid place-items-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>
              </div>

              <h3 className="text-sm font-bold text-white truncate">
                {track.title}
              </h3>
              <p className="text-xs text-[#a7a7a7] truncate mt-0.5">
                {track.artist}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

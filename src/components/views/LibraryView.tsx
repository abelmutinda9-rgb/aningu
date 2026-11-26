import React, { useState } from 'react';
import { Plus, Search, Heart, Music, List, Grid, ArrowUpDown } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const LibraryView: React.FC = () => {
  const {
    playlists,
    createPlaylist,
    selectPlaylist,
    likedTrackIds,
  } = usePlayer();

  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists'>('all');
  const [search, setSearch] = useState('');
  const [viewStyle, setViewStyle] = useState<'list' | 'grid'>('list');

  const handleCreate = () => {
    const name = prompt('Name your new playlist:', `My Playlist #${playlists.length + 1}`);
    if (name && name.trim()) {
      createPlaylist(name.trim(), 'Created on Aningu');
    }
  };

  const filteredPlaylists = playlists.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-['Figtree'] pb-24">
      {/* Library Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Your Library
        </h1>
        <button
          onClick={handleCreate}
          className="p-2 rounded-full hover:bg-[#242424] text-[#a7a7a7] hover:text-white transition-colors"
          title="Create playlist"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(['all', 'playlists', 'artists'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize transition-all ${
              filter === type
                ? 'bg-white text-black font-bold'
                : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search and Layout bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a7a7a7]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search in Your Library"
            className="w-full h-8 pl-8 pr-3 rounded-md bg-[#242424] text-white text-xs placeholder-[#a7a7a7] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-[#a7a7a7]">
          <button
            onClick={() => setViewStyle(v => (v === 'list' ? 'grid' : 'list'))}
            className="p-1.5 rounded hover:text-white hover:bg-[#242424]"
            title="Toggle view"
          >
            {viewStyle === 'list' ? <Grid size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Playlists Listing */}
      {viewStyle === 'list' ? (
        <div className="space-y-1">
          {filteredPlaylists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => selectPlaylist(playlist)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] cursor-pointer group transition-colors"
            >
              <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-[#242424]">
                {playlist.isLikedSongs ? (
                  <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#4b2fd6] to-[#9fb8c9]">
                    <Heart size={22} fill="#fff" className="text-white" />
                  </div>
                ) : (
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {playlist.title}
                </h3>
                <p className="text-xs text-[#a7a7a7] truncate">
                  Playlist • {playlist.isLikedSongs ? `${likedTrackIds.size} songs` : `${playlist.tracks.length} songs`}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPlaylists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => selectPlaylist(playlist)}
              className="p-3 bg-[#181818] hover:bg-[#242424] rounded-md cursor-pointer transition-all group"
            >
              <div className="aspect-square rounded overflow-hidden mb-2 bg-[#242424]">
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
              </div>
              <h3 className="text-sm font-bold text-white truncate">
                {playlist.title}
              </h3>
              <p className="text-xs text-[#a7a7a7] truncate mt-0.5">
                Playlist • {playlist.tracks.length} songs
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Play, Pause, Heart, Clock, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { Track } from '../../types';

export const PlaylistDetailView: React.FC = () => {
  const {
    selectedPlaylist,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    likedTrackIds,
    toggleLike,
    setViewMode,
  } = usePlayer();

  if (!selectedPlaylist) return null;

  const isCurrentPlaylistPlaying =
    isPlaying &&
    selectedPlaylist.tracks.some(t => t.id === currentTrack?.id);

  const totalDuration = selectedPlaylist.tracks.reduce(
    (acc, t) => acc + t.duration,
    0
  );
  const totalMins = Math.floor(totalDuration / 60);

  const handlePlayFirst = () => {
    if (selectedPlaylist.tracks.length === 0) return;
    if (isCurrentPlaylistPlaying) {
      togglePlayPause();
    } else {
      playTrack(selectedPlaylist.tracks[0], selectedPlaylist.tracks);
    }
  };

  return (
    <div className="font-['Figtree'] select-none pb-28">
      {/* Top back button on mobile */}
      <div className="p-4 sm:hidden">
        <button
          onClick={() => setViewMode('home')}
          className="p-2 rounded-full bg-black/40 text-white"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Playlist Hero Header */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b from-[#242424] to-[#121212]">
        <div className="w-44 h-44 sm:w-56 sm:h-56 shadow-2xl rounded-md overflow-hidden shrink-0 bg-[#242424]">
          {selectedPlaylist.isLikedSongs ? (
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#4b2fd6] to-[#9fb8c9]">
              <Heart size={64} fill="#fff" className="text-white" />
            </div>
          ) : (
            <img
              src={selectedPlaylist.coverUrl}
              alt={selectedPlaylist.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs uppercase font-bold text-white tracking-wider">
            {selectedPlaylist.isLikedSongs ? 'Playlist' : 'Public Playlist'}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter my-2">
            {selectedPlaylist.title}
          </h1>
          {selectedPlaylist.description && (
            <p className="text-sm text-[#a7a7a7] mb-3">
              {selectedPlaylist.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
            <span className="font-bold">Aningu</span>
            <span>•</span>
            <span>{selectedPlaylist.tracks.length} songs</span>
            <span>•</span>
            <span className="text-[#a7a7a7]">about {totalMins} min</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="px-6 sm:px-8 py-5 flex items-center gap-6">
        <button
          onClick={handlePlayFirst}
          className="w-14 h-14 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] hover:scale-105 active:scale-95 text-black grid place-items-center transition-all shadow-xl"
        >
          {isCurrentPlaylistPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>

        <button className="text-[#a7a7a7] hover:text-white transition-colors">
          <MoreHorizontal size={28} />
        </button>
      </div>

      {/* Track List Header Table */}
      <div className="px-6 sm:px-8">
        <div className="grid grid-cols-[16px_1fr_40px] sm:grid-cols-[16px_1fr_1fr_40px] gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a7a7a7] border-b border-[#242424]">
          <span>#</span>
          <span>Title</span>
          <span className="hidden sm:inline">Album</span>
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>

        {/* Tracks Rows */}
        <div className="divide-y divide-transparent mt-1">
          {selectedPlaylist.tracks.map((track, idx) => {
            const isTrackCurrent = currentTrack?.id === track.id;
            const isLiked = likedTrackIds.has(track.id);

            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, selectedPlaylist.tracks)}
                className={`grid grid-cols-[16px_1fr_40px] sm:grid-cols-[16px_1fr_1fr_40px] gap-4 px-4 py-2.5 rounded-md hover:bg-[#242424] items-center cursor-pointer group transition-colors ${
                  isTrackCurrent ? 'bg-[#242424]' : ''
                }`}
              >
                {/* Index / Play Indicator */}
                <div className="text-sm font-semibold tabular-nums">
                  {isTrackCurrent && isPlaying ? (
                    <div className="w-3.5 h-3.5 flex items-end gap-0.5">
                      <div className="w-1 bg-[#1ED760] h-full animate-eq-1" />
                      <div className="w-1 bg-[#1ED760] h-full animate-eq-2" />
                      <div className="w-1 bg-[#1ED760] h-full animate-eq-3" />
                    </div>
                  ) : (
                    <span
                      className={`group-hover:hidden ${
                        isTrackCurrent ? 'text-[#1ED760]' : 'text-[#a7a7a7]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  )}
                  <Play
                    size={14}
                    fill="currentColor"
                    className="hidden group-hover:inline text-white"
                  />
                </div>

                {/* Title & Artist */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0 pr-2">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isTrackCurrent ? 'text-[#1ED760]' : 'text-white'
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-xs text-[#a7a7a7] truncate group-hover:text-white">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Album */}
                <span className="hidden sm:inline text-xs text-[#a7a7a7] truncate hover:underline">
                  {track.album || track.title}
                </span>

                {/* Actions: Heart + Duration */}
                <div className="flex items-center justify-end gap-3 text-xs text-[#a7a7a7] tabular-nums">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                    className={`transition-colors ${
                      isLiked
                        ? 'text-[#1ED760]'
                        : 'opacity-0 group-hover:opacity-100 hover:text-white'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? '#1ED760' : 'none'} />
                  </button>
                  <span>
                    {Math.floor(track.duration / 60)}:
                    {Math.floor(track.duration % 60)
                      .toString()
                      .padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

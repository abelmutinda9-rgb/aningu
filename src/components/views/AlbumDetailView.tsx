import React from 'react';
import {
  Play,
  Pause,
  Heart,
  Clock,
  MoreHorizontal,
  ArrowLeft,
  ListPlus,
  Download,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const AlbumDetailView: React.FC = () => {
  const {
    selectedAlbum,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    likedTrackIds,
    toggleLike,
    setViewMode,
    playNext,
    addToQueue,
    downloadTrack,
    downloadPlaylistAction,
    isDownloadingPlaylist,
    playlistDownloadProgress,
    downloadedTrackIds,
  } = usePlayer();

  if (!selectedAlbum) return null;

  const isCurrentAlbumPlaying =
    isPlaying && selectedAlbum.tracks.some(t => t.id === currentTrack?.id);

  const totalDuration = selectedAlbum.tracks.reduce((acc, t) => acc + t.duration, 0);
  const totalMins = Math.floor(totalDuration / 60);

  const isAllDownloaded =
    selectedAlbum.tracks.length > 0 &&
    selectedAlbum.tracks.every(t => downloadedTrackIds.has(t.id));

  const handlePlayFirst = () => {
    if (selectedAlbum.tracks.length === 0) return;
    if (isCurrentAlbumPlaying) {
      togglePlayPause();
    } else {
      playTrack(selectedAlbum.tracks[0], selectedAlbum.tracks);
    }
  };

  const handleDownloadAlbum = () => {
    if (isDownloadingPlaylist) return;
    downloadPlaylistAction(selectedAlbum.tracks);
  };

  return (
    <div className="font-['Figtree'] select-none pb-28">
      {/* Top back button */}
      <div className="p-4 sm:hidden">
        <button
          onClick={() => setViewMode('home')}
          className="p-2 rounded-full bg-black/40 text-white"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Album Hero Header */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-gradient-to-b from-[#2a2a2a] to-[#121212]">
        <div className="w-44 h-44 sm:w-56 sm:h-56 shadow-2xl rounded-md overflow-hidden shrink-0 bg-[#242424]">
          <img
            src={selectedAlbum.coverUrl}
            alt={selectedAlbum.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs uppercase font-bold text-white tracking-wider">
            Album
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter my-2">
            {selectedAlbum.title}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
            <span className="font-bold">{selectedAlbum.artist}</span>
            <span>•</span>
            <span>{selectedAlbum.year}</span>
            <span>•</span>
            <span>{selectedAlbum.tracks.length} songs</span>
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
          {isCurrentAlbumPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>

        {/* Download Entire Album */}
        <button
          onClick={handleDownloadAlbum}
          disabled={isDownloadingPlaylist}
          className={`p-3 rounded-full transition-all flex items-center gap-2 ${
            isAllDownloaded
              ? 'text-[#1ED760] bg-[#1ED760]/10 hover:bg-[#1ED760]/20'
              : 'text-[#a7a7a7] hover:text-white hover:bg-white/10'
          }`}
          title={isAllDownloaded ? 'Album Downloaded' : 'Download Album'}
        >
          {isDownloadingPlaylist ? (
            <Loader2 size={24} className="animate-spin text-[#1ED760]" />
          ) : isAllDownloaded ? (
            <CheckCircle2 size={26} className="text-[#1ED760]" />
          ) : (
            <Download size={24} />
          )}
        </button>

        {playlistDownloadProgress && (
          <div className="text-xs text-[#a7a7a7] flex items-center gap-2 bg-[#181818] px-3 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-ping" />
            <span>
              Downloading {playlistDownloadProgress.completed} of{' '}
              {playlistDownloadProgress.total} songs...
            </span>
          </div>
        )}

        <button className="text-[#a7a7a7] hover:text-white transition-colors ml-auto sm:ml-0">
          <MoreHorizontal size={28} />
        </button>
      </div>

      {/* Track List Header Table */}
      <div className="px-6 sm:px-8">
        <div className="grid grid-cols-[16px_1fr_40px] sm:grid-cols-[16px_1fr_100px] gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a7a7a7] border-b border-[#242424]">
          <span>#</span>
          <span>Title</span>
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>

        {/* Tracks Rows */}
        <div className="divide-y divide-transparent mt-1">
          {selectedAlbum.tracks.map((track, idx) => {
            const isTrackCurrent = currentTrack?.id === track.id;
            const isLiked = likedTrackIds.has(track.id);
            const isDownloaded = downloadedTrackIds.has(track.id);

            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, selectedAlbum.tracks)}
                className={`grid grid-cols-[16px_1fr_40px] sm:grid-cols-[16px_1fr_100px] gap-4 px-4 py-2.5 rounded-md hover:bg-[#242424] items-center cursor-pointer group transition-colors ${
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

                {/* Actions: Download + Play Next + Like + Duration */}
                <div className="flex items-center justify-end gap-2.5 text-xs text-[#a7a7a7] tabular-nums">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      downloadTrack(track);
                    }}
                    className={`transition-colors p-1 ${
                      isDownloaded
                        ? 'text-[#1ED760]'
                        : 'opacity-0 group-hover:opacity-100 hover:text-[#1ED760]'
                    }`}
                    title={isDownloaded ? 'Song Downloaded' : 'Download Song'}
                  >
                    {isDownloaded ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      playNext(track);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-[#1ED760] transition-opacity p-1"
                    title="Play Next"
                  >
                    <ListPlus size={16} />
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                    className={`p-1 transition-colors ${
                      isLiked
                        ? 'text-[#1ED760]'
                        : 'opacity-0 group-hover:opacity-100 hover:text-white'
                    }`}
                    title={isLiked ? 'Unlike' : 'Like'}
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

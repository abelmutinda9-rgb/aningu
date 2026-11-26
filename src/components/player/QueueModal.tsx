import React from 'react';
import { X, Play, Trash2, ArrowUp, ArrowDown, Music, Sliders, ListMusic } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const QueueModal: React.FC = () => {
  const {
    currentTrack,
    queue,
    isPlaying,
    isQueueOpen,
    setIsQueueOpen,
    playTrack,
    removeFromQueue,
    reorderQueue,
    clearQueue,
    crossfadeDuration,
    setCrossfadeDuration,
  } = usePlayer();

  if (!isQueueOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end animate-in fade-in duration-200 font-['Figtree'] select-none">
      <div className="w-full max-w-md bg-[#181818] border-l border-[#282828] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListMusic className="text-[#1ED760]" size={22} />
            <h2 className="text-lg font-bold text-white">Play Queue</h2>
          </div>
          <div className="flex items-center gap-2">
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="text-xs text-[#a7a7a7] hover:text-white px-2 py-1 rounded hover:bg-[#282828] transition-colors"
              >
                Clear Queue
              </button>
            )}
            <button
              onClick={() => setIsQueueOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#282828] text-[#a7a7a7] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          {/* Crossfade Settings Card */}
          <div className="bg-[#121212] p-4 rounded-xl border border-[#282828] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white flex items-center gap-1.5">
                <Sliders size={14} className="text-[#1ED760]" />
                Crossfade
              </span>
              <span className="text-[#1ED760] font-mono">
                {crossfadeDuration === 0 ? 'Off' : `${crossfadeDuration}s`}
              </span>
            </div>
            <p className="text-[11px] text-[#a7a7a7]">
              Overlaps the end of this song with the beginning of the next for seamless playback.
            </p>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={crossfadeDuration}
              onChange={e => setCrossfadeDuration(Number(e.target.value))}
              className="w-full h-1.5 bg-[#282828] rounded-lg appearance-none cursor-pointer accent-[#1ED760]"
            />
            <div className="flex justify-between text-[10px] text-[#a7a7a7]">
              <span>0s (Off)</span>
              <span>6s</span>
              <span>12s</span>
            </div>
          </div>

          {/* Now Playing */}
          {currentTrack && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
                Now Playing
              </span>
              <div className="flex items-center gap-3 p-3 bg-[#242424] rounded-lg border border-[#333]">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded object-cover shadow shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1ED760] truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-[#a7a7a7] truncate">
                    {currentTrack.artist}
                  </p>
                </div>
                {isPlaying ? (
                  <div className="w-4 h-4 flex items-end gap-0.5 shrink-0">
                    <div className="w-1 bg-[#1ED760] h-full animate-eq-1" />
                    <div className="w-1 bg-[#1ED760] h-full animate-eq-2" />
                    <div className="w-1 bg-[#1ED760] h-full animate-eq-3" />
                  </div>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-[#a7a7a7] bg-black/40 px-2 py-0.5 rounded">
                    Paused
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Next In Queue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
                Next in Queue ({queue.length})
              </span>
            </div>

            {queue.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[#282828] text-[#a7a7a7]">
                <Music size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm font-semibold text-white">Your queue is empty</p>
                <p className="text-xs mt-1">
                  Add tracks from any album or playlist using "Play Next" or "Add to Queue".
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {queue.map((track, idx) => (
                  <div
                    key={`${track.id}-${idx}`}
                    className="flex items-center gap-2 p-2 bg-[#1f1f1f] hover:bg-[#282828] rounded-lg group transition-colors"
                  >
                    <span className="w-5 text-center text-xs text-[#a7a7a7] font-mono">
                      {idx + 1}
                    </span>

                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {track.title}
                      </p>
                      <p className="text-[11px] text-[#a7a7a7] truncate">
                        {track.artist}
                      </p>
                    </div>

                    {/* Actions: Reorder & Remove */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => playTrack(track)}
                        className="p-1 rounded hover:bg-[#333] text-[#a7a7a7] hover:text-[#1ED760]"
                        title="Play Now"
                      >
                        <Play size={14} fill="currentColor" />
                      </button>

                      {idx > 0 && (
                        <button
                          onClick={() => reorderQueue(idx, idx - 1)}
                          className="p-1 rounded hover:bg-[#333] text-[#a7a7a7] hover:text-white"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                      )}

                      {idx < queue.length - 1 && (
                        <button
                          onClick={() => reorderQueue(idx, idx + 1)}
                          className="p-1 rounded hover:bg-[#333] text-[#a7a7a7] hover:text-white"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      )}

                      <button
                        onClick={() => removeFromQueue(idx)}
                        className="p-1 rounded hover:bg-[#333] text-[#a7a7a7] hover:text-red-400"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
